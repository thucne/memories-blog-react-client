import React, { useState } from 'react';
import useStyles from './styles';
import { CardActions, Button, Typography, Avatar } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

import { Menu, MenuItem } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AssignmentIcon from '@material-ui/icons/Assignment';
import moment from 'moment';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import GradeIcon from '@material-ui/icons/Grade';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { starComment } from '../../../actions/posts';
import { delComment } from '../../../actions/posts';
import FacebookProgress from '../../Connection/FacebookProgress';


const Comment = ({ cmt, httpToHTTPS, setEdit, setLinear, setFormData, formData }) => {
    const classes = useStyles();
    const avts = useSelector((state) => state.getAVTs);
    const [anchorEl, setAnchorEl] = useState(null);
    const [star, setStar] = useState(false);

    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCommentEdit = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleEdit = (cmt) => {
        setAnchorEl(null);
        setEdit(cmt._id);
        setFormData({ ...formData, comment: cmt.comment });
    }

    const handleDelete = (cmtId) => {
        // e.preventDefault();
        setAnchorEl(null);
        if (setLinear) setLinear(true);
        dispatch(delComment(cmtId))
            .then((result) => {
                setFormData({ ...formData, comment: '' });
                if (setLinear) setLinear(false);
            }).catch(() => {
                if (setLinear) setLinear(false);
            });
    }

    return (
        <div>
            <div className={classes.cmtBlock} style={{ marginTop: '7px' }}>
                <div className={classes.avtCover2} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Avatar style={{ display: 'flex' }} className={classes.avtCmt} alt="Avt" src={avts.filter((avt) => avt.id === cmt.commentId) ? httpToHTTPS(avts.filter((avt) => avt.id === cmt.commentId)[0]?.avt, 4, 's') : ''}>
                        <AssignmentIcon style={{ color: 'green' }} />
                    </Avatar>
                    <Typography variant="body2">
                        {avts.filter((avt) => avt.id === cmt.commentId)[0] ? avts.filter((avt) => avt.id === cmt.commentId)[0]?.name : 'Not found'}
                    </Typography>
                    {
                        (user?.result?.googleId === cmt.commentId || user?.result?._id === cmt.commentId || user?.result?.ggId === cmt.commentId) && (
                            <>
                                <Button style={{ position: 'absolute', right: '10px', color: 'gray' }} size="small" onClick={handleCommentEdit}>
                                    <MoreHorizIcon fontSize="default" />
                                </Button>
                                <Menu
                                    id={`${cmt._id}menus`}
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={() => handleEdit(cmt)}>Edit</MenuItem>
                                    <MenuItem onClick={() => handleDelete(cmt._id)}>Delete</MenuItem>
                                </Menu>
                            </>
                        )
                    }
                </div>
                <Typography className={classes.message2} variant="body2" color="textSecondary" gutterBottom>{cmt.comment}</Typography>
                <Typography className={classes.message2} variant="caption" color="textSecondary" gutterBottom>
                    {`${moment(cmt.createdAt).fromNow()}`}
                    {cmt.modified && ` [modified]`}
                </Typography>
                <CardActions style={{ display: 'flex' }}>
                    {
                        star ? <FacebookProgress /> :
                            <Button size="small" onClick={() => {setStar(true); dispatch(starComment(cmt._id)).then(() => setStar(false)).catch((err) => console.log(err.message));}} startIcon={
                                <FormControlLabel
                                    style={{ marginLeft: '20px' }}
                                    control={
                                        <Checkbox
                                            icon={<GradeOutlinedIcon style={{ color: 'blue' }} fontSize="small" className={classes.star} />}
                                            checkedIcon={<GradeIcon style={{ color: 'blue' }} fontSize="small" className={classes.star} />}
                                            name="checkedI"
                                            checked={cmt.hearts.find((heart) => heart === (user?.result?.googleId || user?.result?._id || user?.result?.ggId)) ? true : false}
                                        />
                                    }

                                />
                            } />
                    }

                    {
                        cmt.hearts.length > 0 ? (
                            <AvatarGroup max={3}>
                                {
                                    cmt.hearts.map((eachHeart, index) => {
                                        return (
                                            <Avatar className={classes.avtStar} key={`${index}taty`} alt={'Oops'} src={avts.filter((avt) => avt.id === eachHeart) ? httpToHTTPS(avts.filter((avt) => avt.id === eachHeart)[0]?.avt, 4, 's') : ''} />
                                        )
                                    })
                                }
                            </AvatarGroup>
                        ) : (<></>)
                    }
                    {
                        cmt.hearts.find((heart) => heart === (user?.result?.googleId || user?.result?._id || user?.result?.ggId)) ? (
                            cmt.hearts.length >= 2 ?
                                <Typography className={classes.message2} variant="caption" color="textSecondary" gutterBottom>
                                    You and {cmt.hearts.length - 1} other(s)
                                </Typography> :
                                <Typography className={classes.message2} variant="caption" color="textSecondary" gutterBottom>
                                    You
                                </Typography>
                        ) : (
                            cmt.hearts.length > 0 ?
                                <Typography className={classes.message2} variant="caption" color="textSecondary" gutterBottom>
                                    {cmt.hearts.length} star(s)
                                </Typography>
                                : <></>
                        )
                    }
                </CardActions>
            </div>
        </div>
    )
}

export default Comment;