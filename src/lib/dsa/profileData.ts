export type DsaProfile = {
  id: string;
  name: string;
  roleTarget: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  targetCompanies: string[];
  weakTopics: string[];
  solvedProblems: number;
  totalTarget: number;
  dailyTime: string;
  deadline: string;
};

export type DsaSheet = {
  title: string;
  label: string;
  problems: string;
  time: string;
  level: string;
  progress: number;
  topics: string[];
};

export type DsaTopic = {
  name: string;
  tag: string;
  count: number;
  desc: string;
  priority: "High" | "Medium" | "Low";
};

export type CompanyPack = {
  name: string;
  focus: string;
  questions: string[];
  readiness: string;
};

export type InterviewQuestion = {
  type: string;
  question: string;
  answer: string;
};

export type WeeklySprintItem = {
  day: string;
  topic: string;
  work: string;
  outcome: string;
};

export type DsaProfilePayload = {
  profile: DsaProfile;
  stats: {
    patternScore: string;
    solvedLabel: string;
    companyReadiness: string;
    nextUnlock: string;
    overallProgress: number;
  };
  sheets: DsaSheet[];
  topics: DsaTopic[];
  companies: CompanyPack[];
  interviewQuestions: InterviewQuestion[];
  weeklySprint: WeeklySprintItem[];
};

const demoProfile: DsaProfile = {
  id: "skillwyn-demo-student",
  name: "Yash",
  roleTarget: "Frontend Developer",
  level: "Intermediate",
  targetCompanies: ["Amazon", "Microsoft", "TCS / Infosys"],
  weakTopics: ["Dynamic Programming", "Graphs", "Binary Search"],
  solvedProblems: 124,
  totalTarget: 450,
  dailyTime: "2 hrs/day",
  deadline: "Job in 3 months",
};

const companyBank: Record<string, Omit<CompanyPack, "readiness"> & { baseReadiness: number }> = {
  Amazon: {
    name: "Amazon",
    focus: "Trees, Graphs, Heaps, Leadership-style problem solving",
    questions: ["LRU Cache", "Top K Frequent", "Rotten Oranges", "Serialize Binary Tree"],
    baseReadiness: 72,
  },
  Google: {
    name: "Google",
    focus: "Graph thinking, DP, clean reasoning, edge cases",
    questions: ["Word Ladder", "Alien Dictionary", "Longest Increasing Path", "Median of Streams"],
    baseReadiness: 48,
  },
  Microsoft: {
    name: "Microsoft",
    focus: "Arrays, DP, recursion, practical implementation",
    questions: ["Merge Intervals", "Clone Graph", "Edit Distance", "Validate BST"],
    baseReadiness: 64,
  },
  "TCS / Infosys": {
    name: "TCS / Infosys",
    focus: "Basics, coding rounds, aptitude-friendly patterns",
    questions: ["Kadane Algorithm", "Palindrome Check", "Prime Range", "Sorting Problems"],
    baseReadiness: 81,
  },
};

const topicBank: DsaTopic[] = [
  { name: "Arrays & Strings", tag: "Foundation", count: 42, desc: "Frequency maps, prefix sums, sorting, string windows", priority: "Medium" },
  { name: "Linked List", tag: "Core", count: 18, desc: "Reverse, cycle, merge, fast-slow pointers", priority: "Low" },
  { name: "Stack & Queue", tag: "Core", count: 24, desc: "Monotonic stack, next greater, expression problems", priority: "Medium" },
  { name: "Binary Search", tag: "Pattern", count: 28, desc: "Answer search, rotated arrays, allocation problems", priority: "High" },
  { name: "Trees & BST", tag: "Interview heavy", count: 36, desc: "Traversals, LCA, views, serialization", priority: "Medium" },
  { name: "Graphs", tag: "Advanced", count: 44, desc: "BFS, DFS, shortest path, DSU, topological sort", priority: "High" },
  { name: "Dynamic Programming", tag: "Boss topic", count: 52, desc: "1D, 2D, knapsack, LIS, partition, DP on trees", priority: "High" },
  { name: "Greedy & Heap", tag: "Company favorite", count: 31, desc: "Scheduling, intervals, priority queue patterns", priority: "Medium" },
];

export function getDsaProfilePayload(profileId = demoProfile.id): DsaProfilePayload {
  const profile = profileId === demoProfile.id ? demoProfile : { ...demoProfile, id: profileId };
  const overallProgress = Math.round((profile.solvedProblems / profile.totalTarget) * 100);
  const weakTopicSet = new Set(profile.weakTopics);

  const sheets: DsaSheet[] = [
    {
      title: "SkillWyn DSA 180",
      label: `${profile.level} Core Sheet`,
      problems: "180 problems",
      time: profile.deadline.includes("3 months") ? "12 weeks" : "12-16 weeks",
      level: `${profile.roleTarget} job-ready path`,
      progress: Math.min(100, overallProgress + 6),
      topics: ["Arrays", "Strings", "Linked List", "Trees", "Graphs", "DP"],
    },
    {
      title: "Weak Topic Recovery",
      label: "AI Priority",
      problems: `${profile.weakTopics.length * 18} problems`,
      time: "14 days",
      level: `Built from ${profile.name}'s weak areas`,
      progress: 18,
      topics: profile.weakTopics,
    },
    {
      title: "Company Sprint Sheet",
      label: "Target companies",
      problems: "90 problems",
      time: "30 days",
      level: profile.targetCompanies.join(", "),
      progress: Math.max(8, overallProgress - 12),
      topics: ["Trees", "Graphs", "DP", "Heaps", "Binary Search", "Mock Rounds"],
    },
  ];

  const topics = topicBank
    .map((topic) => ({
      ...topic,
      priority: weakTopicSet.has(topic.name) ? "High" as const : topic.priority,
    }))
    .sort((a, b) => priorityWeight(b.priority) - priorityWeight(a.priority));

  const companies = profile.targetCompanies.map((name) => {
    const company = companyBank[name] ?? companyBank.Amazon;
    const adjustment = profile.level === "Advanced" ? 10 : profile.level === "Beginner" ? -14 : 0;
    return {
      name: company.name,
      focus: company.focus,
      questions: company.questions,
      readiness: `${Math.max(22, Math.min(95, company.baseReadiness + adjustment))}%`,
    };
  });

  return {
    profile,
    stats: {
      patternScore: `${Math.min(96, overallProgress + 40)}%`,
      solvedLabel: `${profile.solvedProblems} / ${profile.totalTarget}`,
      companyReadiness: `${companies[0]?.name ?? "Amazon"}: ${companies[0]?.readiness ?? "72%"}`,
      nextUnlock: "Boss Mock Round",
      overallProgress,
    },
    sheets,
    topics,
    companies,
    interviewQuestions: [
      {
        type: "Pattern",
        question: `For ${profile.roleTarget}, how do you identify sliding window vs two pointers?`,
        answer: "Use sliding window for contiguous ranges and two pointers for sorted pairs, partitions, or opposite-direction scans.",
      },
      {
        type: "Weak Topic",
        question: `What should ${profile.name} practice first from weak topics?`,
        answer: `${profile.weakTopics[0]} should come first because it affects company rounds and unlocks later patterns.`,
      },
      {
        type: "Coding",
        question: "Explain Longest Substring Without Repeating Characters optimally.",
        answer: "Use a moving window with last-seen indexes and shift the left pointer when a duplicate appears.",
      },
      {
        type: "Deep Dive",
        question: "Why does BFS find the shortest path in an unweighted graph?",
        answer: "BFS explores nodes level by level, so the first visit reaches a node with the fewest edges.",
      },
    ],
    weeklySprint: [
      { day: "Day 1-2", topic: profile.weakTopics[0] ?? "Arrays", work: "12 problems", outcome: "Fix highest-priority weak pattern" },
      { day: "Day 3", topic: profile.weakTopics[1] ?? "Binary Search", work: "8 problems", outcome: "Build confidence with timed practice" },
      { day: "Day 4-5", topic: "Trees + Graphs", work: "10 problems", outcome: "Handle interview-heavy recursion and traversal" },
      { day: "Day 6", topic: profile.targetCompanies[0] ?? "Amazon", work: "3 timed problems", outcome: "Company-style mock round" },
      { day: "Day 7", topic: "Review", work: "Wrong submissions", outcome: "AI creates next sprint from mistakes" },
    ],
  };
}

function priorityWeight(priority: DsaTopic["priority"]) {
  if (priority === "High") return 3;
  if (priority === "Medium") return 2;
  return 1;
}
