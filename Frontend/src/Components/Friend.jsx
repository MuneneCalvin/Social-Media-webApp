import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';
import { setFriends } from 'state';
import { useNavigate } from 'react-router-dom';

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
   const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    const isFriend = friends.find((friend) => friend._id === friendId);

    const patchFriend = async () => {
        const response = await fetch(
        // `http://localhost:5000/users/${_id}/${friendId}`,
        `${process.env.REACT_APP_SERVER_URL}/users/${_id}/${friendId}`,
        {
            method: 'PATCH',
            headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
        }
        );
        const data = await response.json();
        dispatch(setFriends({ friends: data }));
    };

    return (
        <FlexBetween>
        <FlexBetween gap="1rem">
            <UserImage image={userPicturePath} size="55px" />
            <Box
            onClick={() => {
                navigate(`/profile/${friendId}`);
                navigate(0); //refreshes the page when we navigate to another user profile while currently on a different user profile to fix the slight bug issue of components not rendering new user profile we navigated to on the page
            }}
            >
            <Typography
                color={main}
                variant="h5"
                fontWeight="500"
                sx={{
                '&:hover': { color: palette.primary.light, cursor: 'pointer' },
                }}
            >
                {name}
            </Typography>
            <Typography color={medium} fontSize="0.75rem">
                {subtitle}
            </Typography>
            </Box>
        </FlexBetween>
        {friendId === _id ? null : (
            <IconButton
            onClick={patchFriend}
            sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
            >
            {isFriend ? (
                <PersonRemoveOutlined sx={{ color: primaryDark }} />
            ) : (
                <PersonAddOutlined sx={{ color: primaryDark }} />
            )}
            </IconButton>
        )}
        </FlexBetween>
    );
};

export default Friend;