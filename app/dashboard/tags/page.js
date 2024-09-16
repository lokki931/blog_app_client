'use client';

import DashboardBreadcrumbs from '@/app/_components/DashboardBreadcrumbs';
import { fetchUserPosts } from '@/features/posts/postSlice';

import { Box, Button, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import DataPopup from '@/app/_components/DataPopup';
import DataPostsPopup from '@/app/_components/DataPostsPopup';
import { fetchByIdTag, fetchTags, tagDelete } from '@/features/tags/tagSlice';

export default function Tags() {
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedTagPosts, setSelectedTagPosts] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [postsIsPopupOpen, setPostsIsPopupOpen] = useState(false);

  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tags.tags);
  const postsUser = useSelector((state) => state.posts.postsUser);

  const router = useRouter();

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setIsPopupOpen(true);
    dispatch(fetchUserPosts());
  };

  const handleTagPostsClick = (tag) => {
    setSelectedTagPosts(tag);
    setPostsIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedTag(null);
  };
  const closePostsPopup = () => {
    setPostsIsPopupOpen(false);
    setSelectedTagPosts(null);
  };

  const handleDelete = (id) => {
    dispatch(tagDelete(id));
    setTimeout(() => {
      dispatch(fetchTags());
    }, 1000);
  };

  useEffect(() => {
    dispatch(fetchTags());
    dispatch(fetchUserPosts());
  }, [dispatch]);
  return (
    <Grid>
      <Typography variant="h6" component="h6" sx={{ pb: 2 }}>
        <span>Tags</span>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          href="/dashboard/tags/create"
          LinkComponent={Link}
          sx={{ mx: 1 }}>
          New
        </Button>
      </Typography>
      <DashboardBreadcrumbs name={'Tags'} />
      <Box sx={{ py: 3 }}>
        <Grid
          container
          sx={{
            mb: 2,
            borderBottom: '1px solid rgba(25, 118, 210, 0.5)',
            color: '#1976d2',
            textTransform: 'uppercase',
          }}
          spacing={1}>
          <Grid item xs={12} md={5}>
            Title
          </Grid>
          <Grid item xs={12} md={7}>
            Actions
          </Grid>
        </Grid>
        {tags?.tags
          .map((tag) => (
            <Grid
              key={tag.id}
              container
              sx={{
                mb: 2,
                pb: 2,
                borderBottom: '1px solid rgba(25, 118, 210, 0.5)',
                alignItems: 'center',
              }}
              spacing={1}>
              <Grid item xs={12} md={5}>
                {tag.name}
              </Grid>
              <Grid item xs={12} md={7}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    dispatch(fetchByIdTag(tag.id));
                    router.push(`/dashboard/tags/${tag.id}/update`);
                  }}>
                  update
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ ml: 1 }}
                  onClick={() => {
                    handleTagClick(tag);
                  }}>
                  select post
                </Button>
                <Button
                  variant="outlined"
                  sx={{ ml: 1 }}
                  onClick={() => {
                    handleTagPostsClick(tag);
                  }}>
                  posts
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ ml: 1 }}
                  onClick={() => {
                    handleDelete(tag.id);
                  }}>
                  Delete
                </Button>
              </Grid>
            </Grid>
          ))
          .reverse()}
      </Box>
      {isPopupOpen && selectedTag && (
        <DataPopup posts={postsUser?.posts} data={selectedTag} isOn={true} onClose={closePopup} />
      )}
      {postsIsPopupOpen && selectedTagPosts && (
        <DataPostsPopup elem={selectedTagPosts} isOnProp={true} onClosePosts={closePostsPopup} />
      )}
    </Grid>
  );
}
