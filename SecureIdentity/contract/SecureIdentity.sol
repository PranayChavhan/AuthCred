// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SecureIdentity {
    struct User {
        bytes32 hashedData;
        string resumeIPFS;  // ✅ Store Resume IPFS URL
    }
    
    mapping(bytes32 => User) private users;
    
    event UserRegistered(address indexed user, bytes32 hashedData, string resumeIPFS);
    event ResumeUpdated(address indexed user, string newResumeIPFS);

    function registerUser(string memory _name, string memory _mobile, string memory _aadhar, string memory _resumeIPFS) public {
        bytes32 hashedData = keccak256(abi.encodePacked(_name, _mobile, _aadhar));
        
        require(users[hashedData].hashedData == bytes32(0), "User already registered");
        
        users[hashedData] = User(hashedData, _resumeIPFS);
        
        emit UserRegistered(msg.sender, hashedData, _resumeIPFS);
    }
    
    function isVerified(string memory _name, string memory _mobile, string memory _aadhar) public view returns (bool) {
        bytes32 hashedData = keccak256(abi.encodePacked(_name, _mobile, _aadhar));
        return users[hashedData].hashedData == hashedData;
    }

    function updateResume(string memory _name, string memory _mobile, string memory _aadhar, string memory _newResumeIPFS) public {
        bytes32 hashedData = keccak256(abi.encodePacked(_name, _mobile, _aadhar));
        
        require(users[hashedData].hashedData == hashedData, "User not registered");
        
        users[hashedData].resumeIPFS = _newResumeIPFS;
        
        emit ResumeUpdated(msg.sender, _newResumeIPFS);
    }

    function getResume(string memory _name, string memory _mobile, string memory _aadhar) public view returns (string memory) {
        bytes32 hashedData = keccak256(abi.encodePacked(_name, _mobile, _aadhar));
        
        require(users[hashedData].hashedData == hashedData, "User not registered");
        
        return users[hashedData].resumeIPFS;
    }
}
