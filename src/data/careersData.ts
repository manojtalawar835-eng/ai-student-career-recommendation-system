import { Career } from '../types';

export const CAREERS_DATA: Career[] = [
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    category: 'Data & AI',
    description: 'Transform complex structured and unstructured datasets into actionable predictive intelligence and business value using advanced statistics, ML, and data modeling.',
    requiredSkills: ['python', 'sql', 'machine learning', 'statistics', 'pandas', 'scikit-learn', 'data visualization'],
    niceToHaveSkills: ['deep learning', 'r', 'tensorflow', 'pytorch', 'tableau', 'spark', 'nlp'],
    interests: ['data analysis', 'statistical modeling', 'research', 'artificial intelligence', 'business intelligence'],
    difficulty: 'Intermediate',
    avgSalaryUSD: '$120,000 - $165,000',
    jobMarketDemand: 94,
    benchmarks: {
      programming: 82,
      dataAnalytics: 95,
      systemDesign: 65,
      problemSolving: 90,
      communication: 80,
      toolsAndDevOps: 70,
    },
    recommendedCertifications: ['IBM Data Science Professional', 'AWS Certified Machine Learning - Specialty', 'Google Data Analytics Certificate'],
    keyResponsibilities: [
      'Build statistical and machine learning models for predictive forecasting',
      'Perform exploratory data analysis and feature engineering on massive data sets',
      'Translate technical analytical insights into executive business recommendations',
      'Collaborate with data engineers to deploy production inference pipelines'
    ]
  },
  {
    id: 'ai-engineer',
    name: 'AI & Machine Learning Engineer',
    category: 'Data & AI',
    description: 'Design, build, and deploy production-scale deep learning models, LLMs, neural networks, and generative AI systems into resilient cloud software architectures.',
    requiredSkills: ['python', 'pytorch', 'deep learning', 'machine learning', 'nlp', 'docker', 'cloud computing'],
    niceToHaveSkills: ['tensorflow', 'langchain', 'vector databases', 'kubernetes', 'cuda', 'hugging face', 'mlops'],
    interests: ['artificial intelligence', 'neural networks', 'natural language processing', 'generative ai', 'computer vision'],
    difficulty: 'Advanced',
    avgSalaryUSD: '$135,000 - $185,000',
    jobMarketDemand: 98,
    benchmarks: {
      programming: 92,
      dataAnalytics: 88,
      systemDesign: 85,
      problemSolving: 95,
      communication: 75,
      toolsAndDevOps: 85,
    },
    recommendedCertifications: ['TensorFlow Developer Certificate', 'DeepLearning.AI AI Engineering', 'AWS Certified Machine Learning'],
    keyResponsibilities: [
      'Architect and fine-tune large language models and transformer architectures',
      'Build end-to-end MLOps deployment and monitoring pipelines',
      'Optimize model latency and throughput via quantization and GPU acceleration',
      'Integrate vector embeddings, RAG pipelines, and agentic workflows'
    ]
  },
  {
    id: 'full-stack-developer',
    name: 'Full Stack Web Developer',
    category: 'Software Engineering',
    description: 'Architect and craft end-to-end web applications, designing interactive modern user interfaces while building scalable server APIs and secure database backends.',
    requiredSkills: ['javascript', 'typescript', 'react', 'node.js', 'sql', 'html', 'css', 'git'],
    niceToHaveSkills: ['next.js', 'express', 'tailwind css', 'docker', 'graphql', 'mongodb', 'redis'],
    interests: ['web development', 'ui/ux', 'api development', 'system architecture', 'product design'],
    difficulty: 'Intermediate',
    avgSalaryUSD: '$105,000 - $145,000',
    jobMarketDemand: 92,
    benchmarks: {
      programming: 90,
      dataAnalytics: 60,
      systemDesign: 85,
      problemSolving: 85,
      communication: 80,
      toolsAndDevOps: 78,
    },
    recommendedCertifications: ['Meta Full-Stack Developer Certificate', 'AWS Certified Developer - Associate', 'OpenJS Node.js Application Developer'],
    keyResponsibilities: [
      'Design responsive, accessible user interfaces using React and modern CSS',
      'Develop RESTful and GraphQL backend microservices in Node.js or Python',
      'Model relational databases (PostgreSQL/MySQL) and optimize query performance',
      'Set up CI/CD workflows and deploy applications to modern cloud platforms'
    ]
  },
  {
    id: 'frontend-developer',
    name: 'Frontend Engineer',
    category: 'Software Engineering',
    description: 'Craft high-performance, accessible, and delightful interactive user experiences across web and mobile platforms with modern frameworks and state architectures.',
    requiredSkills: ['react', 'typescript', 'javascript', 'html', 'css', 'tailwind css', 'git'],
    niceToHaveSkills: ['next.js', 'vue', 'redux', 'jest', 'web performance', 'figma', 'storybook'],
    interests: ['ui design', 'frontend architecture', 'user experience', 'animations', 'responsive design'],
    difficulty: 'Entry Level',
    avgSalaryUSD: '$95,000 - $135,000',
    jobMarketDemand: 88,
    benchmarks: {
      programming: 86,
      dataAnalytics: 50,
      systemDesign: 75,
      problemSolving: 80,
      communication: 85,
      toolsAndDevOps: 70,
    },
    recommendedCertifications: ['Meta Frontend Developer Professional', 'W3Cx Front-End Web Developer'],
    keyResponsibilities: [
      'Build pixel-perfect, accessible UI components adhering to design systems',
      'Optimize Core Web Vitals, page load times, and rendering pipelines',
      'Manage complex client-side application state and real-time streaming data',
      'Collaborate with product designers to prototype new interactive concepts'
    ]
  },
  {
    id: 'backend-developer',
    name: 'Backend Software Engineer',
    category: 'Software Engineering',
    description: 'Engineer high-throughput server systems, microservices, databases, authentication layers, and distributed computing architectures powering digital platforms.',
    requiredSkills: ['python', 'java', 'node.js', 'sql', 'rest api', 'git', 'database design'],
    niceToHaveSkills: ['go', 'postgresql', 'redis', 'kafka', 'microservices', 'docker', 'system design'],
    interests: ['distributed systems', 'database engineering', 'api design', 'backend performance', 'security'],
    difficulty: 'Intermediate',
    avgSalaryUSD: '$110,000 - $155,000',
    jobMarketDemand: 91,
    benchmarks: {
      programming: 92,
      dataAnalytics: 68,
      systemDesign: 92,
      problemSolving: 90,
      communication: 75,
      toolsAndDevOps: 82,
    },
    recommendedCertifications: ['Oracle Certified Java SE Developer', 'AWS Certified Solutions Architect - Associate'],
    keyResponsibilities: [
      'Develop scalable, fault-tolerant backend services and REST/gRPC endpoints',
      'Design relational and NoSQL schemas with indexing and caching strategies',
      'Implement authentication, authorization (OAuth/JWT), and data encryption',
      'Profile system bottlenecks and optimize low-latency data processing'
    ]
  },
  {
    id: 'cybersecurity-analyst',
    name: 'Cybersecurity Analyst & Engineer',
    category: 'Security & Infrastructure',
    description: 'Safeguard enterprise networks, systems, and sensitive cloud assets from cyber threats, vulnerabilities, unauthorized intrusions, and security breaches.',
    requiredSkills: ['networking', 'linux', 'security', 'ethical hacking', 'firewalls', 'cryptography', 'python'],
    niceToHaveSkills: ['wireshark', 'siem', 'penetration testing', 'soc analysis', 'incident response', 'metasploit'],
    interests: ['information security', 'network protocols', 'ethical hacking', 'threat hunting', 'forensics'],
    difficulty: 'Intermediate',
    avgSalaryUSD: '$105,000 - $150,000',
    jobMarketDemand: 96,
    benchmarks: {
      programming: 75,
      dataAnalytics: 70,
      systemDesign: 82,
      problemSolving: 92,
      communication: 80,
      toolsAndDevOps: 88,
    },
    recommendedCertifications: ['CompTIA Security+', 'Certified Ethical Hacker (CEH)', 'CISSP (Associate)'],
    keyResponsibilities: [
      'Monitor enterprise networks for anomalous activities and security events',
      'Conduct vulnerability assessments, penetration testing, and code audits',
      'Design incident response procedures and mitigate real-time cyber threats',
      'Ensure regulatory compliance (SOC2, ISO 27001, GDPR) across digital assets'
    ]
  },
  {
    id: 'cloud-engineer',
    name: 'Cloud & Infrastructure Engineer',
    category: 'Cloud & DevOps',
    description: 'Architect, automate, and maintain elastic cloud computing infrastructure, serverless services, and hybrid cloud networks on AWS, GCP, or Azure.',
    requiredSkills: ['aws', 'linux', 'docker', 'networking', 'cloud computing', 'terraform', 'python'],
    niceToHaveSkills: ['kubernetes', 'azure', 'gcp', 'ci/cd', 'ansible', 'serverless', 'bash'],
    interests: ['cloud architecture', 'infrastructure automation', 'scalability', 'site reliability', 'networking'],
    difficulty: 'Intermediate',
    avgSalaryUSD: '$115,000 - $160,000',
    jobMarketDemand: 93,
    benchmarks: {
      programming: 78,
      dataAnalytics: 62,
      systemDesign: 90,
      problemSolving: 85,
      communication: 78,
      toolsAndDevOps: 95,
    },
    recommendedCertifications: ['AWS Certified Solutions Architect', 'Google Cloud Professional Cloud Architect', 'Microsoft Certified: Azure Administrator'],
    keyResponsibilities: [
      'Provision and orchestrate infrastructure-as-code using Terraform and CloudFormation',
      'Manage multi-region container deployments with Docker and Kubernetes',
      'Implement cloud security baselines, IAM role least-privilege, and cost governance',
      'Ensure high availability, disaster recovery, and automated failover capabilities'
    ]
  },
  {
    id: 'devops-engineer',
    name: 'DevOps & Site Reliability Engineer (SRE)',
    category: 'Cloud & DevOps',
    description: 'Bridge software engineering and operational stability by building automated CI/CD release pipelines, observability systems, and self-healing cloud clusters.',
    requiredSkills: ['docker', 'kubernetes', 'ci/cd', 'linux', 'git', 'python', 'bash'],
    niceToHaveSkills: ['jenkins', 'github actions', 'prometheus', 'grafana', 'terraform', 'helm', 'ansible'],
    interests: ['continuous integration', 'automation', 'observability', 'resilience engineering', 'cloud native'],
    difficulty: 'Advanced',
    avgSalaryUSD: '$120,000 - $170,000',
    jobMarketDemand: 95,
    benchmarks: {
      programming: 82,
      dataAnalytics: 65,
      systemDesign: 90,
      problemSolving: 90,
      communication: 80,
      toolsAndDevOps: 98,
    },
    recommendedCertifications: ['Certified Kubernetes Administrator (CKA)', 'AWS Certified DevOps Engineer', 'HashiCorp Certified: Terraform Associate'],
    keyResponsibilities: [
      'Construct automated build, test, and zero-downtime deployment CI/CD pipelines',
      'Build real-time monitoring, metrics dashboards, and distributed tracing stacks',
      'Maintain Kubernetes clusters, ingress controllers, and service meshes',
      'Drive post-mortems and define Service Level Objectives (SLOs) and Error Budgets'
    ]
  },
  {
    id: 'data-engineer',
    name: 'Data Platform Engineer',
    category: 'Data & AI',
    description: 'Construct resilient data pipelines, streaming ingestion engines, and data lakes/warehouses that feed clean, reliable analytical data to ML models and dashboards.',
    requiredSkills: ['sql', 'python', 'data modeling', 'etl', 'spark', 'database design', 'git'],
    niceToHaveSkills: ['airflow', 'kafka', 'snowflake', 'dbt', 'bigquery', 'hadoop', 'aws'],
    interests: ['data architecture', 'stream processing', 'big data', 'pipeline optimization', 'distributed databases'],
    difficulty: 'Intermediate',
    avgSalaryUSD: '$115,000 - $160,000',
    jobMarketDemand: 94,
    benchmarks: {
      programming: 85,
      dataAnalytics: 90,
      systemDesign: 90,
      problemSolving: 88,
      communication: 75,
      toolsAndDevOps: 86,
    },
    recommendedCertifications: ['Databricks Certified Data Engineer', 'Google Professional Data Engineer', 'Snowflake SnowPro Core'],
    keyResponsibilities: [
      'Design and maintain batch and streaming ETL/ELT data ingestion workflows',
      'Optimize massive SQL analytical queries, table partitioning, and indexing',
      'Implement data governance, schema validation, and data quality checks',
      'Scale cloud data warehouses (Snowflake/BigQuery/Redshift) for enterprise teams'
    ]
  },
  {
    id: 'mobile-app-developer',
    name: 'Mobile App Engineer (iOS/Android)',
    category: 'Software Engineering',
    description: 'Create native and cross-platform mobile apps delivering smooth gesture animations, offline persistence, push notifications, and device hardware integrations.',
    requiredSkills: ['flutter', 'react native', 'javascript', 'typescript', 'mobile ui', 'git', 'rest api'],
    niceToHaveSkills: ['swift', 'kotlin', 'ios', 'android', 'firebase', 'sqlite', 'app store deployment'],
    interests: ['mobile interfaces', 'cross-platform apps', 'touch gestures', 'hardware sensors', 'app ecosystem'],
    difficulty: 'Intermediate',
    avgSalaryUSD: '$100,000 - $145,000',
    jobMarketDemand: 86,
    benchmarks: {
      programming: 88,
      dataAnalytics: 52,
      systemDesign: 80,
      problemSolving: 82,
      communication: 80,
      toolsAndDevOps: 76,
    },
    recommendedCertifications: ['Meta iOS / Android Developer Certificate', 'Google Associate Android Developer'],
    keyResponsibilities: [
      'Build responsive mobile applications using Flutter or React Native',
      'Integrate device capabilities including camera, geolocation, biometric auth, and bluetooth',
      'Optimize app launch time, frame rates (60/120 fps), and battery consumption',
      'Manage App Store and Google Play release lifecycles and over-the-air updates'
    ]
  },
  {
    id: 'ui-ux-designer',
    name: 'Product & UI/UX Designer',
    category: 'Product & Design',
    description: 'Transform complex user requirements and mental models into intuitive, accessible, and visually stunning digital products through research, wireframing, and design systems.',
    requiredSkills: ['figma', 'ui design', 'ux research', 'wireframing', 'prototyping', 'user testing', 'communication'],
    niceToHaveSkills: ['html', 'css', 'design systems', 'micro-interactions', 'accessibility (wcag)', 'adobe xd', 'motion design'],
    interests: ['visual aesthetics', 'user psychology', 'interaction design', 'usability testing', 'design thinking'],
    difficulty: 'Entry Level',
    avgSalaryUSD: '$90,000 - $130,000',
    jobMarketDemand: 87,
    benchmarks: {
      programming: 45,
      dataAnalytics: 60,
      systemDesign: 70,
      problemSolving: 85,
      communication: 95,
      toolsAndDevOps: 60,
    },
    recommendedCertifications: ['Google UX Design Professional Certificate', 'Nielsen Norman Group UX Master Certification'],
    keyResponsibilities: [
      'Conduct qualitative user interviews, usability audits, and card sorting tests',
      'Build scalable design systems, typography hierarchies, and reusable component libraries in Figma',
      'Prototype high-fidelity animated user flows for web and mobile applications',
      'Partner closely with front-end engineers to ensure flawless design implementation'
    ]
  },
  {
    id: 'product-manager',
    name: 'Technical Product Manager',
    category: 'Product & Design',
    description: 'Guide digital software products from ideation to launch by aligning engineering capability, user research, product strategy, and business objectives.',
    requiredSkills: ['product roadmap', 'agile', 'scrum', 'data analysis', 'user stories', 'communication', 'stakeholder management'],
    niceToHaveSkills: ['sql', 'jira', 'market research', 'a/b testing', 'system architecture', 'financial modeling'],
    interests: ['product strategy', 'business modeling', 'leadership', 'user advocacy', 'market analysis'],
    difficulty: 'Intermediate',
    avgSalaryUSD: '$120,000 - $170,000',
    jobMarketDemand: 89,
    benchmarks: {
      programming: 60,
      dataAnalytics: 82,
      systemDesign: 78,
      problemSolving: 92,
      communication: 98,
      toolsAndDevOps: 65,
    },
    recommendedCertifications: ['Product School Certified Product Manager (CPM)', 'Scrum Product Owner (CSPO)'],
    keyResponsibilities: [
      'Define product visions, quarterly roadmaps, and measurable OKRs/KPIs',
      'Synthesize user research, telemetry data, and customer feedback into prioritized backlogs',
      'Write detailed technical product requirements (PRDs) and user stories',
      'Facilitate cross-functional alignment across design, engineering, sales, and executive teams'
    ]
  }
];

export const SKILL_TAXONOMY = {
  'Programming Languages': ['python', 'javascript', 'typescript', 'java', 'c++', 'c#', 'go', 'rust', 'php', 'ruby', 'swift', 'kotlin', 'sql', 'r', 'html', 'css', 'bash'],
  'Frameworks & Libraries': ['react', 'next.js', 'vue', 'angular', 'node.js', 'express', 'django', 'flask', 'fastapi', 'spring boot', 'pytorch', 'tensorflow', 'scikit-learn', 'pandas', 'numpy', 'flutter', 'react native', 'tailwind css'],
  'Cloud & DevOps': ['aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform', 'ci/cd', 'git', 'github actions', 'linux', 'jenkins', 'ansible', 'prometheus', 'grafana', 'serverless'],
  'Data & AI': ['machine learning', 'deep learning', 'nlp', 'data visualization', 'data modeling', 'etl', 'sql', 'bigquery', 'snowflake', 'spark', 'tableau', 'power bi', 'langchain', 'vector databases', 'computer vision'],
  'Security & Infrastructure': ['networking', 'security', 'ethical hacking', 'cryptography', 'firewalls', 'wireshark', 'penetration testing', 'siem', 'soc analysis', 'linux administration'],
  'Soft Skills & Process': ['communication', 'teamwork', 'problem solving', 'agile', 'scrum', 'critical thinking', 'time management', 'leadership', 'presentation', 'adaptability']
};
