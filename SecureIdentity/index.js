const express = require("express");
const { ethers } = require("ethers");
require("dotenv").config();
const { PinataSDK } = require("pinata")
const fs = require("fs")
const { Blob } = require("buffer")
const cors = require('cors');


const app = express();
app.use(express.json());
// ✅ Initialize Provider & Wallet

app.use(cors()); // Allow all origins by default

app.use(cors({
    origin: '*', // Allows all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));




const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
provider.getBlockNumber().then(console.log).catch(console.error);

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// ✅ Smart Contract ABI & Instance
const contractABI = [
    "function registerUser(string _name, string _mobile, string _aadhar, string _resumeIPFS) public",
    "function isVerified(string _name, string _mobile, string _aadhar) public view returns (bool)",
    "function getResume(string _name, string _mobile, string _aadhar) public view returns (string)",
    "function updateResume(string _name, string _mobile, string _aadhar, string _resumeIPFS) public"
];

const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// ✅ Utility: Validate Input Fields for POST Requests
const validateInputs = (req, res, next) => {
    const { name, mobile, aadhar } = req.body;
    if (!name || !mobile || !aadhar) {
        return res.status(400).json({ success: false, error: "All fields (name, mobile, aadhar) are required." });
    }
    next();
};



const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT,
    pinataGateway: process.env.GATEWAY_URL
})

async function upload() {
    try {
        const blob = new Blob([fs.readFileSync("./hello-world.txt")]);
        const file = new File([blob], "hello-world.txt", { type: "text/plain" })
        const upload = await pinata.upload.public.file(file);
        console.log(upload)
    } catch (error) {
        console.log(error)
    }
}

upload()

// ✅ Register User API
app.post("/register", validateInputs, async (req, res) => {
    try {
        const { name, mobile, aadhar, resumeIPFS } = req.body;

        console.log(`ℹ️ Registering user: ${name}, ${mobile}, ${aadhar}`);

        const balance = await provider.getBalance(wallet.address);
        console.log(`Balance: ${ethers.formatEther(balance)} ETH`);

        const isAlreadyRegistered = await contract.isVerified(name, mobile, aadhar);

        if (isAlreadyRegistered) {
            return res.status(400).json({ success: false, error: "User already registered." });
        }

        const tx = await contract.registerUser(name, mobile, aadhar, resumeIPFS);
        await tx.wait();  // Wait for transaction confirmation

        res.json({ success: true, message: "User registered successfully.", txHash: tx.hash });

    } catch (error) {
        res.status(500).json({ success: false, error: error.reason || error.message });
    }
});

// ✅ Verify User API (GET Request with Query Parameters)
app.get("/verify", async (req, res) => {
    try {
        const { name, mobile, aadhar } = req.body;  // ✅ Extract from query params

        if (!name || !mobile || !aadhar) {
            return res.status(400).json({ success: false, error: "Missing required query parameters." });
        }

        console.log(`ℹ️ Verifying user: ${name}, ${mobile}, ${aadhar}`);

        const isVerified = await contract.isVerified(name, mobile, aadhar);
        res.json({ success: true, isVerified });

    } catch (error) {
        console.error("❌ Error in /verify:", error);
        res.status(500).json({ success: false, error: error.reason || error.message });
    }
});

// ✅ Get Resume API (GET Request with Query Parameters)
app.get("/getResume", async (req, res) => {
    try {
        const { name, mobile, aadhar } = req.body;  // ✅ Extract from query params

        if (!name || !mobile || !aadhar) {
            return res.status(400).json({ success: false, error: "Missing required query parameters." });
        }

        console.log(`ℹ️ Fetching resume for user: ${name}`);

        const resumeIPFS = await contract.getResume(name, mobile, aadhar);
        res.json({ success: true, resumeIPFS });

    } catch (error) {
        console.error("❌ Error in /getResume:", error);
        res.status(500).json({ success: false, error: error.reason || error.message });
    }
});

// ✅ Update Resume API
app.post("/updateResume", validateInputs, async (req, res) => {
    try {
        const { name, mobile, aadhar, resumeIPFS } = req.body;

        console.log(`ℹ️ Updating resume for: ${name}`);

        const tx = await contract.updateResume(name, mobile, aadhar, resumeIPFS);
        await tx.wait(); // Wait for transaction confirmation

        res.json({ success: true, message: "Resume updated successfully.", txHash: tx.hash });

    } catch (error) {
        console.error("❌ Error in /updateResume:", error);
        res.status(500).json({ success: false, error: error.reason || error.message });
    }
});

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    const network = await provider.getNetwork();
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌐 Connected to network: ${network.name} (${network.chainId})`);
});
