import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";

export const dummyData = [
  {
    id: 1,
    platform: "Facebook",
    icon: <FiFacebook className="text-blue-600" size={24} />,
    followers: 3940,
    growth: "+15%",
    posts: 2150,
    engagementUsers: "500",
    pageImpressions: "1.5M",
    socialInteractions: "3510",
    pageImpressionsJan: 100,
    pageImpressionsFeb: 300,
    pageImpressionsMar: 380,
    pageImpressionsApr: 140,
    pageImpressionsMay: 500,
    pageImpressionsJun: 160,
    socialInteractionsJan: 600,
    socialInteractionsFeb: 550,
    socialInteractionsMar: 100,
    socialInteractionsApr: 320,
    socialInteractionsMay: 250,
    socialInteractionsJun: 400,
    details: {
      lastPost: "3 hours ago",
      avgPostReach: "10K",
      engagementRate: 4399,
    }
  },
  {
    id: 2,
    platform: "Instagram",
    icon: <FiInstagram className="text-pink-500" size={24} />,
    followers: 6873,
    growth: "+25%",
    posts: 4403,
    engagementUsers: "1.2K",
    pageImpressions: "2.8M",
    socialInteractions: "1043",
    pageImpressionsJan: 150,
    pageImpressionsFeb: 700,
    pageImpressionsMar: 160,
    pageImpressionsApr: 190,
    pageImpressionsMay: 400,
    pageImpressionsJun: 210,
    socialInteractionsJan: 600,
    socialInteractionsFeb: 650,
    socialInteractionsMar: 700,
    socialInteractionsApr: 350,
    socialInteractionsMay: 800,
    socialInteractionsJun: 850,
    details: {
      lastPost: "1 hour ago",
      avgPostReach: "15K",
      engagementRate: 5011,
    }
  },
  {
    id: 3,
    platform: "Twitter",
    icon: <FiTwitter className="text-blue-400" size={24} />,
    followers: 9430,
    growth: "-5%",
    posts: 6820,
    engagementUsers: "150",
    pageImpressions: "800K",
    socialInteractions: "1091",
    pageImpressionsJan: 280,
    pageImpressionsFeb: 670,
    pageImpressionsMar: 100,
    pageImpressionsApr: 700,
    pageImpressionsMay: 750,
    pageImpressionsJun: 870,
    socialInteractionsJan: 300,
    socialInteractionsFeb: 120,
    socialInteractionsMar: 130,
    socialInteractionsApr: 340,
    socialInteractionsMay: 150,
    socialInteractionsJun: 960,
    details: {
      lastPost: "5 hours ago",
      avgPostReach: "3K",
      engagementRate: 9689,
    }
  },
];

export const chartData = {
  labels: ["Facebook", "Instagram", "Twitter"],
  datasets: [
    {
      label: "Followers Growth",
      data: [15, 25, -5],
      backgroundColor: ["#3b5998", "#E1306C", "#1DA1F2"],
    },
    {
      label: "Engagement Users",
      data: [500, 1200, 150],
      backgroundColor: ["#3b5998", "#E1306C", "#1DA1F2"],
    },
    {
      label: "Page Impressions (M)",
      data: [1.5, 2.8, 0.8],
      backgroundColor: ["#3b5998", "#E1306C", "#1DA1F2"],
    },
    {
      label: "Social Interactions",
      data: [350, 1000, 100],
      backgroundColor: ["#3b5998", "#E1306C", "#1DA1F2"],
    },
  ],
};

// Prepare the line chart data from the modified dummyData
export const lineChartData = (platformData) => ({
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Page Impressions",
      data: [
        platformData.pageImpressionsJan,
        platformData.pageImpressionsFeb,
        platformData.pageImpressionsMar,
        platformData.pageImpressionsApr,
        platformData.pageImpressionsMay,
        platformData.pageImpressionsJun,
      ],
      fill: false,
      borderColor: "#36A2EB",
      tension: 0.1,
    },
  ],
});

export const lineChartInteractions = (platformData) => ({
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Social Interactions",
      data: [
        platformData.socialInteractionsJan,
        platformData.socialInteractionsFeb,
        platformData.socialInteractionsMar,
        platformData.socialInteractionsApr,
        platformData.socialInteractionsMay,
        platformData.socialInteractionsJun,
      ],
      fill: false,
      borderColor: "#FF6384",
      tension: 0.1,
    },
  ],
});
