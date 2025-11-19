// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SentientEscrow {
    // Events
    event NewJob(uint256 indexed jobId, address indexed requester, uint256 bounty, string data);
    event JobCompleted(uint256 indexed jobId, address indexed worker, string result);

    // Job Struct
    struct Job {
        uint256 id;
        address requester;
        uint256 bounty;
        string data; // URL or Text of the task
        address worker;
        string result;
        bool isComplete;
    }

    // State
    uint256 public jobCounter;
    mapping(uint256 => Job) public jobs;

    constructor() {}

    // 1. Create a Job (Attach HBAR)
    function createJob(string memory _data) external payable {
        require(msg.value > 0, "Bounty must be greater than 0");

        jobCounter++;
        jobs[jobCounter] = Job({
            id: jobCounter,
            requester: msg.sender,
            bounty: msg.value,
            data: _data,
            worker: address(0),
            result: "",
            isComplete: false
        });

        emit NewJob(jobCounter, msg.sender, msg.value, _data);
    }

    // 2. Submit Work (Claim Bounty)
    // NOTE: For Hackathon MVP, we are using Optimistic Verification.
    // Any address can submit. In production, we would whitelist Agents or use a challenge period.
    function submitWork(uint256 _jobId, string memory _result) external {
        Job storage job = jobs[_jobId];

        require(!job.isComplete, "Job already completed");
        require(job.bounty > 0, "Job does not exist");

        job.worker = msg.sender;
        job.result = _result;
        job.isComplete = true;

        // Pay the Worker
        (bool sent, ) = payable(msg.sender).call{value: job.bounty}("");
        require(sent, "Failed to send HBAR");

        emit JobCompleted(_jobId, msg.sender, _result);
    }

    // View Function
    function getJob(uint256 _jobId) external view returns (Job memory) {
        return jobs[_jobId];
    }
}
