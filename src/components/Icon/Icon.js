import React from "react";

function Icon({ icon, width, height, style }) {
  const IconComponent = icon;

  return <IconComponent style={{ width, height, ...style }} />;
}

export default Icon;
