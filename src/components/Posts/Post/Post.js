import React, { useState, useEffect, useRef } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Tooltip, Avatar, Grid, Slide, TextField, Badge } from '@material-ui/core';
// import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

import Comment from './Comment';

import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AssignmentIcon from '@material-ui/icons/Assignment';

import moment from 'moment';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
// import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ConfirmDelete from './ComfirmDelete';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import ShowAllAvts from './ShowAllAvts';
import ShareIcon from '@material-ui/icons/Share';
import CommentIcon from '@material-ui/icons/Comment';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import ShareOrDownload from './ShareOrDownload';
import FullImage from './FullImage';
import {LinearProgress} from '@material-ui/core';

import { postComment, editComment } from '../../../actions/posts';

const Post = ({ post, setCurrentId, setLinear }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const avts = useSelector((state) => state.getAVTs);
    const user = JSON.parse(localStorage.getItem('profile'));
    const [open, setOpen] = useState(false);
    const [isDel, setIsDel] = useState(false);
    const [isShowAll, setIsShowAll] = useState(false);
    const [setOfValues, setSetOfValues] = useState('');
    const myToBeSharedCard = useRef(null);
    const [isShared, setIsShared] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const [showComment, setShowComment] = useState(false);
    // const [comment, setComment] = useState('');
    const [formData, setFormData] = useState({ postId: post._id, comment: '' });
    // const [anchorEl, setAnchorEl] = useState(null);
    const [edit, setEdit] = useState('');
    const scrollComment = useRef(null);

    const [isPostingComment, setIsPostingComment] = useState(false);



    const cmts = useSelector(state => {
        return Array.isArray(state.cmts) ? state.cmts.filter((cmt) => cmt.postId === post._id) : []
    });

    // const [cmts, setCmts] = useState([{
    //     postId: '6054fb7cd30a4600225567fa',
    //     commentId: '60448eab1e15f64cb06e6a8a',
    //     comment: 'Sorry, this MEmory has no comment!',
    //     createdAt: '2021-03-20T19:29:00.245+00:00'
    // }]);

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    const httpToHTTPS = (str, from, what) => {
        if (str) {
            return str.substring(0, from) + what + str.substring(from);
        }
        return '';
    }

    const confirmDelete = () => {
        setOpen(true);
    }

    const handleShowAll = async (e) => {
        e.preventDefault();
        await post.likes.map((eachLike) => {
            avts.filter((avt) => avt.id === eachLike);
            const temp = avts.filter((avt) => avt.id === eachLike);
            return setSetOfValues(old => [...old,
            {
                avt: temp ? temp[0]?.avt : '',
                email: temp ? temp[0]?.email : ''
            }]);
        });

        setIsShowAll(true);
    }

    const shareCard = () => {
        setIsShared(true);
    }

    const showComments = async () => {
        const isShow = getShowComment();
        await setShowComment(isShow);
        if (isShow) {
            scrollComment.current.scrollIntoView();

        } else {
            myToBeSharedCard.current.scrollIntoView();
        }
    }

    const getShowComment = () => {
        return !showComment;
    }

    const handleMouseHover = () => {
        setIsHover(true);
    }

    const handleChange = (e) => {
        setFormData({ ...formData, comment: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (setLinear) setLinear(true);
        setIsPostingComment(true);
        if (edit.length > 0) {
            dispatch(editComment(edit, formData))
                .then((result) => {
                    setFormData({ ...formData, comment: '' });
                    if (setLinear) setLinear(false);
                    setIsPostingComment(false);
                }).catch(() => {
                    if (setLinear) setLinear(false);
                    setIsPostingComment(false);
                });
        } else {
            dispatch(postComment(formData))
                .then((result) => {
                    setFormData({ ...formData, comment: '' });
                    if (setLinear) setLinear(false);
                    setIsPostingComment(false);
                }).catch(() => {
                    if (setLinear) setLinear(false);
                    setIsPostingComment(false);
                });
        }
    }

    // const handleCommentEdit = (event) => {
    //     setAnchorEl(event.currentTarget);
    // }

    useEffect(() => {
        if (isDel) {
            dispatch(deletePost(post._id)).then(() => setIsDel(false)).catch(() => setIsDel(false));
        }
    }, [dispatch, isDel, post._id]);

    const AvtLike = () => {
        if (post.likes.length > 0) {
            return <AvatarGroup max={4}>
                {
                    post.likes.map((eachLike, index) => {
                        return (
                            <Avatar key={`${index}taqqqt`} alt={post.name} src={avts.filter((avt) => avt.id === eachLike) ? httpToHTTPS(avts.filter((avt) => avt.id === eachLike)[0]?.avt, 4, 's') : ''} />
                        )
                    })
                }
            </AvatarGroup>
        }
        return <></>;
    }


    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id || user?.result?.ggId))
                ? (
                    <>
                        <FormControlLabel
                            style={{ fontSize: 'small' }}
                            control={<Checkbox icon={<FavoriteBorder className={classes.heart} />} checkedIcon={<Favorite className={classes.heart} />} name="checkedH" />}
                            label={post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} Heart${post.likes.length > 1 ? 's' : ''}`} checked
                        />
                    </>
                ) : (
                    <>
                        <FormControlLabel
                            style={{ fontSize: 'small' }}
                            control={<Checkbox icon={<FavoriteBorder className={classes.heart} />} checkedIcon={<Favorite className={classes.heart} />} name="checkedH" />}
                            label={`${post.likes.length} ${post.likes.length === 1 ? 'Heart' : 'Hearts'}`}
                        />
                    </>
                );
        }

        return <FormControlLabel
            style={{ fontSize: 'small' }}
            control={<Checkbox icon={<FavoriteBorder className={classes.heart} />} checkedIcon={<Favorite className={classes.heart} />} name="checkedH" />}
            label={`Heart`}
        />;
    };

    return (
        <>
            {
                isShowAll && <ShowAllAvts open={isShowAll} setOpen={setIsShowAll} setOfValues={setOfValues} />
            }
            {
                isShared && <ShareOrDownload anchorEl={isShared} setAnchorEl={setIsShared} postCard={myToBeSharedCard.current} postCardTitle={post.title} />
            }
            {
                open && <ConfirmDelete open={open} setOpen={setOpen} setIsDel={setIsDel} />
            }
            {
                isHover && <FullImage open={isHover} setOpen={setIsHover} img={httpToHTTPS(post.selectedFile, 4, 's')} />
            }
            <Card ref={myToBeSharedCard} className={post.oops ? `${classes.card} ${classes.cardOops}` : `${classes.card} ${classes.cardNotOops}`}>
                <div onClick={handleMouseHover}>
                    <CardMedia className={classes.media} image={httpToHTTPS(post.selectedFile, 4, 's')} title={post.title} />
                </div>
                <div className={classes.overlay}>
                    <div className={classes.avtCover} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        {(process.env.REACT_APP_OOPS.split(',').indexOf(user?.result?._id) > -1 || process.env.REACT_APP_OOPS.split(',').indexOf(user?.result?.ggId) > -1) ? (
                            <>
                                <Avatar className={classes.avt} alt="Avt" src={avts.filter((avt) => avt.id === post.creator) ? httpToHTTPS(avts.filter((avt) => avt.id === post.creator)[0]?.avt, 4, 's') : post.creatorAvt}>
                                    <AssignmentIcon style={{ color: 'green' }} />
                                </Avatar>
                                <Typography className={classes.username} variant="h6">
                                    {avts.filter((avt) => avt.id === post.creator)[0] ? avts.filter((avt) => avt.id === post.creator)[0]?.name : post.name}
                                </Typography>
                            </>) : (<>
                                <Avatar className={classes.avt} alt="Avt" src={''}>
                                    <AssignmentIcon style={{ color: 'green' }} />
                                </Avatar>
                                <Typography className={classes.username} variant="h6">
                                    {post.name}
                                </Typography></>)}
                        &nbsp;
                        {post.oops && (
                            <Tooltip title="Verified User">
                                <VerifiedUserIcon style={{ color: '#20FF00' }} />
                            </Tooltip>)}
                        <br />
                    </div>
                    <Typography variant="body2" style={{ display: 'flex' }}>
                        {`${moment(post.createdAt).format('ddd, MMMM DD YYYY, hh:mm a')} [${moment(post.createdAt).fromNow()}]`}
                        {post.modified ? (post.modified === true ?
                            (
                                <Tooltip title="This MEmory has been modified by the author!">
                                    <LoyaltyIcon style={{ color: 'yellow' }} />
                                </Tooltip>
                            ) : ''
                        ) : ''}
                    </Typography>

                </div>
                {
                    (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator || user?.result?.ggId === post?.creator) && (
                        <div className={classes.overlay2}>
                            <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>
                                <MoreHorizIcon fontSize="default" />
                            </Button>
                        </div>
                    )
                }
                {
                    (process.env.REACT_APP_OOPS.split(',').indexOf(user?.result?._id) > -1 || process.env.REACT_APP_OOPS.split(',').indexOf(user?.result?.ggId) > -1 || process.env.REACT_APP_OOPS.split(',').indexOf(user?.result?.googleId) > -1) &&
                    <>
                        <div className={classes.overlay3}>
                            <Button style={{ color: 'pink' }} size="small" onClick={shareCard}>
                                <ShareIcon />
                            </Button>
                        </div>
                        <div className={classes.overlay4}>
                            <Button style={{ color: 'pink' }} size="small" onClick={showComments}>
                                <Badge badgeContent={cmts.length} color="primary" classes={{ badge: classes.myBadge }}>
                                    <CommentIcon />
                                </Badge>
                            </Button>
                        </div>
                    </>
                }
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom variant="h5">{post.title}</Typography>
                <CardContent>
                    <Typography className={classes.message} variant="body2" color="textSecondary" component="p">{post.message}</Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                        <Likes />
                    </Button>
                    {
                        (process.env.REACT_APP_OOPS.split(',').indexOf(user?.result?._id) > -1 || process.env.REACT_APP_OOPS.split(',').indexOf(user?.result?.ggId) > -1 || process.env.REACT_APP_OOPS.split(',').indexOf(user?.result?.googleId) > -1) && (
                            <Button onClick={handleShowAll} size="small" color="primary" disabled={!user?.result}>
                                <AvtLike />
                            </Button>
                        )
                    }
                    {
                        (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator || user?.result?.ggId === post?.creator) && (
                            <Button size="small" color="primary" onClick={confirmDelete}>
                                <DeleteIcon fontSize="small" />
                            Delete
                            </Button>
                        )
                    }
                </CardActions>
                {
                    true &&
                    <Slide direction="right" in={showComment} mountOnEnter unmountOnExit timeout={{ enter: 1500, exit: 500 }}>
                        <Card ref={scrollComment} className={classes.card2}>
                            <CardContent>
                                {
                                    edit && <Typography variant="body2" color="textSecondary" gutterBottom>You are editting your comment, press Enter to update. <br />Otherwise, press the <Button className={classes.clearr} onClick={() => { setEdit(''); setFormData({ ...formData, comment: '' }) }}>Clear</Button> button for typing new comment!</Typography>
                                }
                                {
                                    isPostingComment ? <LinearProgress /> : <form autoComplete="off" onSubmit={handleSubmit}>
                                        <TextField required label="Comment" fullWidth onChange={handleChange} value={formData.comment} />
                                    </form>
                                }
                            </CardContent>
                            <CardContent>
                                <Grid container alignItems="stretch" spacing={1} style={{ display: 'block' }}>
                                    {cmts.sort((a, b) => { return (new Date(b.createdAt) - new Date(a.createdAt)) }).map((cmt, index) => (
                                        <Comment
                                            key={cmt._id}
                                            cmt={cmt}
                                            setLinear={setLinear}
                                            formData={formData}
                                            setFormData={setFormData}
                                            setEdit={setEdit}
                                            httpToHTTPS={httpToHTTPS}
                                        />
                                    ))}
                                    {
                                        cmts.length === 0 && <Typography className={classes.message2} variant="body2" color="textSecondary" gutterBottom>No comment!</Typography>
                                    }
                                </Grid>
                            </CardContent>
                        </Card>
                    </Slide>

                }
            </Card>
        </>
    );
}

export default Post;