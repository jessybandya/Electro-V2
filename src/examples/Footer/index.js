import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "../../components/SoftBox";
import SoftTypography from "../../components/SoftTypography";

// Soft UI Dashboard React base styles
import typography from "../../assets/theme/base/typography";


import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import FavoriteIcon from '@mui/icons-material/Favorite';


function Footer({ company, links }) {
  const { href, name } = company;
  const { size } = typography;

  const renderLinks = () =>
    links.map((link) => (
      <SoftBox key={link.name} component="li" px={2} lineHeight={1}>
        <Link href={link.href} target="_blank">
          <SoftTypography variant="button" fontWeight="regular" color="text">
            {link.name}
          </SoftTypography>
        </Link>
      </SoftBox>
    ));

  return (
    <SoftBox
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems="center"
      px={1.5}
    >
      <SoftBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        &copy; {new Date().getFullYear()}, made with
        <SoftBox fontSize={size.md} color="text" mb={-0} mx={0.25}>
            <FavoriteIcon style={{color:'#e74c3c'}} fontSize="inherit"/>
        </SoftBox>
        by
        <Link href={href} target="_blank">
          <SoftTypography variant="button" style={{fontWeight:'bold'}}>
          &nbsp;{name}&nbsp;
          </SoftTypography>
        </Link>
        for a better future.
      </SoftBox>
      <SoftBox
        component="ul"
        sx={({ breakpoints }) => ({
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          listStyle: "none",
          mt: 3,
          mb: 0,
          p: 0,

          [breakpoints.up("lg")]: {
            mt: 0,
          },
        })}
      >
      <SoftBox>
      <Link href="https://twitter.com/jessybandya" target="__blank">
      <TwitterIcon color="inherit" fontSize="inherit"/>
      </Link>
    </SoftBox>
    <SoftBox fontSize={size.md} color="text" mb={-0.5} mx={1.0}>
    <Link href="https://www.instagram.com/jessybandya" target="__blank">
    <InstagramIcon color="inherit" fontSize="inherit"/>
    </Link>
  </SoftBox>
  <SoftBox fontSize={size.md} color="text" mb={-0.5} mx={1.0}>
  <Link href="https://www.linkedin.com/in/jessy-bandya-7934a01b4" target="__blank">
  <LinkedInIcon color="inherit" fontSize="inherit"/>
  </Link>
</SoftBox>
<SoftBox fontSize={size.md} color="text" mb={-0.5} mx={1.0}>
<Link href="https://github.com/jessybandya" target="__blank">
<GitHubIcon color="inherit" fontSize="inherit"/>
 </Link>
 </SoftBox>
      </SoftBox>
    </SoftBox>
  );
}

// Setting default values for the props of Footer
Footer.defaultProps = {
  company: { href: "https://laughing-darwin-c668f3.netlify.app/", name: "Jessy Bandya" },
};

// Typechecking props for the Footer
Footer.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.object),
};

export default Footer;
