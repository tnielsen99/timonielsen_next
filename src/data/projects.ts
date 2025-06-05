export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  description: string;
  mainParagraph: string;
  features: string[];
  technicalImplementation: string;
  impact: string;
  images: {
    hero: string;
    gallery: string[];
  };
  nextProject?: string;
}

export const projects: Record<string, Project> = {
  "analytics-dashboard": {
    slug: "analytics-dashboard",
    title: "Analytics Dashboard",
    subtitle: "Real-time Performance Analytics",
    year: "2024",
    description:
      "Real-time analytics dashboard for McLaren Automotive, providing insights into vehicle performance, manufacturing efficiency, and predictive maintenance.",
    mainParagraph:
      "Developed a comprehensive real-time analytics dashboard for McLaren Automotive, enabling data-driven decision-making across manufacturing, performance testing, and customer experience departments. The platform processes over 100GB of daily telemetry data from vehicles and production lines, providing instant insights through advanced visualizations and predictive analytics models.",
    features: [
      "Real-time telemetry processing from 500+ sensors",
      "Predictive maintenance algorithms with 94% accuracy",
      "Manufacturing efficiency monitoring and optimization",
      "Custom KPI dashboards for different departments",
      "Automated anomaly detection and alerting system",
      "Historical trend analysis and forecasting",
    ],
    technicalImplementation:
      "Built on Azure cloud infrastructure with a microservices architecture, the dashboard leverages Apache Kafka for real-time data streaming, Azure Data Lake for storage, and Power BI embedded for interactive visualizations. The backend APIs are developed in Python with FastAPI, while the frontend uses React with TypeScript for a responsive user experience.",
    impact:
      "The analytics dashboard has transformed McLaren's approach to data utilization, resulting in a 35% reduction in unplanned downtime, 20% improvement in production efficiency, and enhanced customer satisfaction through proactive maintenance recommendations. The platform now serves as the central nervous system for data-driven operations across the organization.",
    images: {
      hero: "/images/playground-1.png",
      gallery: [
        "/images/playground-1.png",
        "/images/playground-2.png",
        "/images/playground-3.png",
      ],
    },
    nextProject: "engine-ml",
  },
  "engine-ml": {
    slug: "engine-ml",
    title: "Engine ML",
    subtitle: "Machine Learning for Engine Optimization",
    year: "2024",
    description:
      "Advanced machine learning models for engine performance optimization, predicting component failures and optimizing fuel efficiency in real-time.",
    mainParagraph:
      "Developed sophisticated machine learning models that analyze engine performance data to predict component failures, optimize fuel efficiency, and enhance overall vehicle performance. The system processes real-time telemetry data and provides actionable insights to both engineers and drivers.",
    features: [
      "Real-time engine performance analysis",
      "Component failure prediction with 92% accuracy",
      "Fuel efficiency optimization algorithms",
      "Adaptive learning from driver behavior",
      "Integration with vehicle control systems",
      "Cloud-based model training and deployment",
    ],
    technicalImplementation:
      "The solution utilizes TensorFlow and PyTorch for deep learning models, deployed on Azure ML platform. Real-time inference is handled through edge computing devices in vehicles, with continuous model updates via OTA. The system integrates with existing ECU systems through CAN bus protocols.",
    impact:
      "The ML system has improved fuel efficiency by 12%, reduced unexpected engine failures by 40%, and provided valuable insights for future engine design iterations. It has become a key differentiator in McLaren's vehicle performance offerings.",
    images: {
      hero: "/images/matvoyce.png",
      gallery: ["/images/matvoyce.png"],
    },
    nextProject: "data-governance",
  },
  "data-governance": {
    slug: "data-governance",
    title: "Data Governance",
    subtitle: "Enterprise Data Management Platform",
    year: "2022",
    description:
      "Comprehensive data governance platform ensuring data quality, security, and compliance across McLaren's global operations.",
    mainParagraph:
      "Designed and implemented an enterprise-wide data governance platform that standardizes data management practices, ensures regulatory compliance, and maintains data quality across all business units. The platform provides a single source of truth for critical business data.",
    features: [
      "Automated data quality monitoring",
      "GDPR and regulatory compliance tools",
      "Data lineage tracking and visualization",
      "Role-based access control system",
      "Metadata management repository",
      "Data catalog with business glossary",
    ],
    technicalImplementation:
      "Built using Collibra for governance workflows, Apache Atlas for metadata management, and custom Python scripts for data quality checks. The platform integrates with existing data warehouses and lakes through REST APIs and SQL connectors.",
    impact:
      "The platform has improved data quality scores by 45%, reduced compliance incidents by 80%, and accelerated data discovery time by 60%. It has become the foundation for all data-driven initiatives across the organization.",
    images: {
      hero: "/images/ascon-system.jpg",
      gallery: ["/images/ascon-system.jpg"],
    },
    nextProject: "azure-migration",
  },
};

export function getProjectBySlug(slug: string): Project | undefined {
  return projects[slug];
}

export function getAllProjects(): Project[] {
  return Object.values(projects);
}