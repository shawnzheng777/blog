import React, { FC } from "react";
import { Card, Spin } from "antd";
import { useRequest } from "ahooks";
import { getDashboard } from "@/api/dashboard";

const Home: FC = () => {
  const { data: dashboardData, loading } = useRequest(() => getDashboard());

  return (
    <Spin spinning={loading}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {dashboardData?.map((item, index) => (
          <Card
            style={{ width: "calc(100vw - 200px)", marginBottom: "15px" }}
            key={index}
          >
            {item.content}
          </Card>
        ))}
      </div>
    </Spin>
  );
};

export default Home;
