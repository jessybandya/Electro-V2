/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "../../../components/SoftBox";
import SoftTypography from "../../../components/SoftTypography";
import SoftAvatar from "../../../components/SoftAvatar";
import SoftButton from "../../../components/SoftButton";

function ProfilesList({ title, profiles }) {
  const renderProfiles = profiles.map(({ fileData, title, description, fileType, articleID, ownerId }) => (
    <SoftBox key={title} component="li" display="flex" alignItems="center" py={1} mb={1}>
      <SoftBox mr={2}>
      {fileType === "image" ?(
        <>
       {fileData === ""?(
        <SoftAvatar src="http://www.wuyidoric.com.au/WuYiDoric/media/images/Projects/UniversityOfNairobiTowersProject/UniversityOfNairobiTowersProject_banner.jpg" alt={title} variant="rounded" shadow="md" />
       ):(
        <SoftAvatar src={fileData} alt={title} variant="rounded" shadow="md" />
       )}  
        </>
      ):(
        <SoftAvatar src="http://www.wuyidoric.com.au/WuYiDoric/media/images/Projects/UniversityOfNairobiTowersProject/UniversityOfNairobiTowersProject_banner.jpg" alt={title} variant="rounded" shadow="md" />
      )}
      </SoftBox>
      <SoftBox
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
      >
        <SoftTypography variant="button" fontWeight="medium">
         {title}
        </SoftTypography>
        <SoftTypography variant="caption" color="text">
        {description.length > 70 ?(
          <>
          {description.substring(0, 70)}<span style={{fontWeight:'bold'}}>...more</span>
          </>
        ):(
          <>
          {description.substring(0, 70)}
          </>
        )}
        </SoftTypography>
      </SoftBox>
      <SoftBox ml="auto">
         <Link to={`/article/true/${articleID}/${ownerId}`}>
         <SoftButton
         component="a"
         target="_blank"
         rel="noreferrer"
         variant="text"
         color="info"
       >
         View
       </SoftButton>        
         </Link>
      </SoftBox>
    </SoftBox>
  ));

  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox pt={2} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </SoftTypography>
      </SoftBox>
      <SoftBox p={2}>
        <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderProfiles}
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

// Typechecking props for the ProfilesList
ProfilesList.propTypes = {
  title: PropTypes.string.isRequired,
  profiles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProfilesList;
