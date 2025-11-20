'use client';

import { useState, useEffect } from 'react';
import { Briefcase, CheckCircle, Clock, Coins } from 'lucide-react';
import { CONTRACT_ADDRESS, Job, weiToHbar } from '@/lib/contract';

export default function JobFeed() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [jobCount, setJobCount] = useState(0);

    useEffect(() => {
        fetchJobs();
        const interval = setInterval(fetchJobs, 10000); // Refresh every 10 seconds
        return () => clearInterval(interval);
    }, []);

    const fetchJobs = async () => {
        try {
            setIsLoading(true);

            // Fetch events from Mirror Node to get job data
            const eventsUrl = `https://testnet.mirrornode.hedera.com/api/v1/contracts/${CONTRACT_ADDRESS}/results/logs?order=desc&limit=50`;
            const eventsResponse = await fetch(eventsUrl);

            if (!eventsResponse.ok) {
                console.error('Failed to fetch events');
                setIsLoading(false);
                return;
            }

            const eventsData = await eventsResponse.json();
            console.log('Events data:', eventsData);

            // Parse events to extract jobs
            const parsedJobs: Job[] = [];

            if (eventsData.logs && eventsData.logs.length > 0) {
                // Group logs by job ID
                const jobMap = new Map<string, Partial<Job>>();

                eventsData.logs.forEach((log: any) => {
                    try {
                        if (log.topics && log.topics.length >= 3) {
                            // NewJob event has 4 topics, JobCompleted has 3
                            if (log.topics.length === 4) {
                                // NewJob event
                                const jobId = parseInt(log.topics[1], 16);
                                const requester = '0x' + log.topics[2].slice(-40);

                                const existingJob = jobMap.get(jobId.toString()) || {};
                                jobMap.set(jobId.toString(), {
                                    ...existingJob,
                                    id: BigInt(jobId),
                                    requester: requester,
                                    bounty: BigInt(5 * 1e18), // Default 5 HBAR
                                    data: `Job #${jobId} - Check transaction for details`,
                                    isComplete: existingJob.isComplete || false,
                                });
                            } else if (log.topics.length === 3) {
                                // JobCompleted event
                                const jobId = parseInt(log.topics[1], 16);
                                const worker = '0x' + log.topics[2].slice(-40);

                                const existingJob = jobMap.get(jobId.toString()) || {};
                                jobMap.set(jobId.toString(), {
                                    ...existingJob,
                                    id: BigInt(jobId),
                                    worker: worker,
                                    result: 'AI-generated result (check transaction for full details)',
                                    isComplete: true,
                                });
                            }
                        }
                    } catch (error) {
                        console.error('Error parsing log:', error);
                    }
                });

                // Convert map to array and fill in missing fields
                jobMap.forEach((job) => {
                    if (job.id) {
                        parsedJobs.push({
                            id: job.id,
                            requester: job.requester || '0x0000000000000000000000000000000000000000',
                            bounty: job.bounty || BigInt(5 * 1e18),
                            data: job.data || 'Loading...',
                            worker: job.worker || '0x0000000000000000000000000000000000000000',
                            result: job.result || '',
                            isComplete: job.isComplete || false,
                        });
                    }
                });

                // Sort by job ID descending
                parsedJobs.sort((a, b) => Number(b.id) - Number(a.id));
            }

            setJobs(parsedJobs);
            setJobCount(parsedJobs.length);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching jobs:', error);
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="glass rounded-xl p-8 text-center">
                <div className="inline-block w-8 h-8 border-4 border-neon-purple border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-foreground/70">Loading jobs from blockchain...</p>
            </div>
        );
    }

    if (jobs.length === 0) {
        return (
            <div className="glass rounded-xl p-8 text-center">
                <Briefcase className="w-16 h-16 text-neon-purple/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Jobs Yet</h3>
                <p className="text-foreground/70">Post a job to see it appear here!</p>
                <p className="text-sm text-foreground/50 mt-2">Jobs will refresh automatically every 10 seconds</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">
                    Job Feed
                </h2>
                <div className="flex items-center gap-3">
                    <span className="glass px-4 py-2 rounded-lg text-sm font-mono">
                        {jobCount} {jobCount === 1 ? 'Job' : 'Jobs'}
                    </span>
                    <button
                        onClick={fetchJobs}
                        className="glass px-4 py-2 rounded-lg text-sm hover:bg-neon-purple/10 transition-colors"
                    >
                        🔄 Refresh
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {jobs.map((job) => (
                    <div
                        key={job.id.toString()}
                        className={`glass rounded-xl p-6 border-l-4 ${job.isComplete ? 'border-neon-green' : 'border-neon-blue'
                            } hover:scale-[1.02] transition-transform`}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${job.isComplete ? 'bg-neon-green/10' : 'bg-neon-blue/10'}`}>
                                    {job.isComplete ? (
                                        <CheckCircle className="w-5 h-5 text-neon-green" />
                                    ) : (
                                        <Clock className="w-5 h-5 text-neon-blue" />
                                    )}
                                </div>
                                <div>
                                    <span className="text-xs font-mono text-foreground/70">Job #{job.id.toString()}</span>
                                    <p className={`text-sm font-semibold ${job.isComplete ? 'text-neon-green' : 'text-neon-blue'}`}>
                                        {job.isComplete ? 'Completed ✓' : 'Processing...'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 bg-neon-purple/10 px-3 py-1 rounded-lg">
                                <Coins className="w-4 h-4 text-neon-purple" />
                                <span className="font-mono font-semibold text-neon-purple">
                                    {weiToHbar(job.bounty)} HBAR
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <p className="text-xs text-foreground/50 mb-1">Task:</p>
                                <p className="text-foreground">{job.data}</p>
                                <p className="text-xs text-foreground/50 mt-1">Requester: {job.requester}</p>
                            </div>

                            {job.isComplete && job.result && (
                                <div className="bg-dark-elevated rounded-lg p-4 border border-neon-green/20">
                                    <p className="text-xs text-neon-green mb-2">✓ Completed by AI Agent:</p>
                                    <p className="text-sm text-foreground/90">{job.result}</p>
                                    <p className="text-xs text-foreground/50 mt-2">Worker: {job.worker}</p>
                                </div>
                            )}

                            {!job.isComplete && (
                                <div className="flex items-center gap-2 text-sm text-foreground/70">
                                    <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse"></div>
                                    Waiting for AI agent to process...
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
