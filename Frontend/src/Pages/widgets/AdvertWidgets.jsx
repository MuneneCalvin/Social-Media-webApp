import { Typography, useTheme } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import WidgetWrapper from 'components/WidgetWrapper';

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        src={`${process.env.REACT_APP_SERVER_URL}/assets/info4.jpeg`}
        alt="advert"
        height="auto"
        width="100%"
        style={{ borderRadius: '0.75rem', margin: '0.75rem 0' }}
      />
      <FlexBetween>
        <Typography color={main}>VCosmetics</Typography>
        <Typography color={medium}>vcosmetics.com</Typography>
      </FlexBetween>

      <Typography color={medium} m="0.5rem 0">
        Your best bet for an amazing skin care product to give you the smoothest
        skin texture
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;