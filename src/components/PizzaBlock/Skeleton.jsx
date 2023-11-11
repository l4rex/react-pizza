import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
  speed={2}
  width={280}
  height={465}
  viewBox="0 0 280 465"
  backgroundColor="#f3f3f3"
  foregroundColor="#ecebeb"
  {...props}
>
  <rect x="9" y="313" rx="5" ry="5" width="248" height="70" /> 
  <rect x="19" y="420" rx="5" ry="5" width="82" height="38" /> 
  <rect x="160" y="421" rx="20" ry="20" width="104" height="37" /> 
  <circle cx="127" cy="119" r="111" /> 
  <rect x="14" y="246" rx="5" ry="5" width="239" height="27" />
</ContentLoader>
)

export default Skeleton