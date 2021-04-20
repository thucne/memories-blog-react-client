import React from 'react';
// import { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
// import DraftsIcon from '@material-ui/icons/Drafts';

import download from 'downloadjs';
// import * as htmlToImage from 'html-to-image';
import { toPng } from 'html-to-image';
// import { FacebookShareButton, FacebookIcon } from "react-share";

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

export default function ShareOrDownload({ anchorEl, setAnchorEl, postCard, postCardTitle }) {
    // const [dataUrl, setDataUrl] = useState('');


    const handleClose = () => {
        setAnchorEl(false);
    };

    const justDownload = async () => {
        await toPng(postCard, {height: 1080})
            .then(function (dataUrl) {
                download(dataUrl, `MEmories - ${postCardTitle}`);
                handleClose();
            });
    }


    return (
        <div>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {/* <FacebookShareButton
                    url={dataUrl}
                    quote={`MEmories [${postCardTitle}]`}
                    hashtag="#MEmories"
                >
                    <StyledMenuItem>
                        <ListItemIcon>
                            <FacebookIcon size={36} />
                        </ListItemIcon>
                        <ListItemText primary="Share to Facebook" />
                    </StyledMenuItem>
                </FacebookShareButton> */}

                <StyledMenuItem onClick={justDownload}>
                    <ListItemIcon>
                        <InboxIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Download card (.png)" />
                </StyledMenuItem>
            </StyledMenu>
        </div>
    );
}
