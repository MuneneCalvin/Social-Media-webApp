import { Box } from '@mui/material';

const UserImage = ({ image, size = '60px' }) => {
    return (
        <Box width={size} height={size}>
        <img
            src={`${process.env.REACT_APP_SERVER_URL}/assets/${image}`}
            alt="profile pic"
            style={{ objectFit: 'cover', borderRadius: '50%' }}
            width={size}
            height={size}
        />
        </Box>
    );
};

export default UserImage;