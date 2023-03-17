import React from "react";
import ContentLoader from "react-content-loader";

export const Skeleton: React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#ebeaea"
    foregroundColor="#ecebeb"
  >
    <circle cx="138" cy="125" r="125" />
    <rect x="155" y="315" rx="0" ry="0" width="3" height="3" />
    <rect x="0" y="302" rx="10" ry="10" width="280" height="85" />
    <rect x="0" y="258" rx="5" ry="5" width="280" height="28" />
    <rect x="38" y="465" rx="0" ry="0" width="35" height="6" />
    <rect x="1" y="404" rx="5" ry="5" width="90" height="27" />
    <rect x="130" y="397" rx="20" ry="20" width="150" height="42" />
  </ContentLoader>
);