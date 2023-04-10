import React, { createContext, useContext, useState } from "react";
import { Affix, Button, Divider, Layout, theme } from "antd";
import { Navigate, Outlet } from "react-router-dom";

import { PoweroffOutlined } from "@ant-design/icons";
import { HeaderLeftNavBar } from "./_components/Navbar/HeaderLeftNavBar";
import { MenuLeftNavBar } from "./_components/Navbar/MenuLeftNavBar";
import { AdminHeader } from "./_components/Header/AdminHeader";
import { Modal } from "./Management/component/Modal";

const { Content, Footer, Sider } = Layout;
const localStorage:any = window.localStorage.getItem('jira')
const tokenBearer = JSON.parse(localStorage)

export const TokenBearer = createContext('')

export function HomeTemplate() {
  const jiraJson = window.localStorage.getItem("jira");
  if (jiraJson === null) {
    return <Navigate to={"/login"} replace />;
  }
  return (
    <>
    <TokenBearer.Provider value={tokenBearer && tokenBearer.accessToken}>
      <Layout>
        <Affix>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {}}
            onCollapse={(collapsed, type) => {
            }}
            style={{
              paddingTop: "20px",
              height: "100vh",
              position: "relative",
            }}
          >
            <div className="logo" />
            <HeaderLeftNavBar />
            <Divider orientation="left" plain>
              Left Text
            </Divider>
            <MenuLeftNavBar />
            <div style={{ position: "absolute", bottom: "10px", left: "10px" }}>
              <h6>Admin</h6>
              <div className="d-flex justify-content-end">
                <Button
                  onClick={() => {
                    window.localStorage.removeItem("jira");
                    window.alert("Đăng xuất thành công !");
                    window.location.reload();
                  }}
                  type="primary"
                  icon={<PoweroffOutlined />}
                  danger
                />
              </div>
            </div>
          </Sider>
        </Affix>
        <Layout>
          <AdminHeader />
          <Content style={{ margin: "24px 16px 0" }}>
            <div style={{ padding: 24, minHeight: 360 }}>
              <Outlet />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>Designed By Linh Pham</Footer>
        </Layout>
      </Layout>
      <Modal />
      </TokenBearer.Provider>
    </>
  );
}
