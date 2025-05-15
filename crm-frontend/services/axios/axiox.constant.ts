export const AxiosUrls = [
  {
    type: "production",
    url: process.env.NEXT_PUBLIC_API_URL + "/api/v1",
  },
  {
    type: "Staging",
    url: process.env.NEXT_PUBLIC_API_URL + "/uat/api/v1",
  },
  {
    type: "Development",
    url: process.env.NEXT_PUBLIC_API_URL + "/dev/api/v1",
  },
  {
    type: "Local",
    url: "http://localhost:4000/api/v1",
  },
];
