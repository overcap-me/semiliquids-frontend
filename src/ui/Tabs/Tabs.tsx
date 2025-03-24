import { ButtonOrLink } from "@/components/ButtonOrLink";
import { Typography } from "@/components/Typography";
import { EBackgroundColor, Wrapper } from "@/components/Wrapper";
import clsx from "clsx";
import { useState } from "react";
import stylesMenu from "@/components/Menu/Menu.module.css";

const Tab = ({ label, index, isActive, onClick }) => {
  return (
    <ButtonOrLink
      asTag="button"
      color="active"
      isActive={isActive}
      onClick={() => onClick(index)}
      pointDirection="bottom"
    >
      <Typography as="h4">{label}</Typography>
    </ButtonOrLink>
  );
};

// Reusable TabPanel component
const TabPanel = ({ children, isActive, index }) => {
  return (
    <div
      role="tabpanel"
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      hidden={!isActive}
    >
      {children}
    </div>
  );
};

// Main Tabs component
export const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <Wrapper
        classNameContainer={stylesMenu.Menu}
        bg={EBackgroundColor.Navigation}
      >
        <div role="tablist" className={clsx(stylesMenu.Menu__Wrapper)}>
          {tabs.map((tab, index) => (
            <div key={index} className={stylesMenu.Menu__Item}>
              <Tab
                key={index}
                label={tab.label}
                index={index}
                isActive={activeTab === index}
                onClick={handleTabClick}
              />
            </div>
          ))}
        </div>
      </Wrapper>

      {tabs.map((tab, index) => (
        <TabPanel key={index} isActive={activeTab === index} index={index}>
          {tab.content}
        </TabPanel>
      ))}
    </div>
  );
};
