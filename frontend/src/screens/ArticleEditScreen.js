import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listArticleDetails, updateArticle } from '../actions/articleActions';
import { ARTICLE_UPDATE_RESET } from '../constants/articleConstant';

import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../components/RichEditor.css';

const ArticleEditScreen = ({ match, history }) => {
	const articleId = match.params.id;

	const [title, setTitle] = useState('');
	const [image, setImage] = useState('');
	const [category, setCategory] = useState('');
	const [uploading, setUploading] = useState(false);

	const [description, setDescription] = useState(EditorState.createEmpty());

	const dispatch = useDispatch();

	const articleDetails = useSelector((state) => state.articleDetails);
	const { loading, error, article } = articleDetails;

	const articleUpdate = useSelector((state) => state.articleUpdate);
	const {
		loading: loadingUpdate,
		success: successUpdate,
		error: errorUpdate,
	} = articleUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: ARTICLE_UPDATE_RESET });
			history.push('/admin/articlelist');
		} else {
			if (!article.title || article._id !== articleId) {
				dispatch(listArticleDetails(articleId));
			} else {
				setTitle(article.title);
				setImage(article.image);
				//setDescription(article.content);
				setCategory(article.category);
			}
		}
	}, [dispatch, history, articleId, article, successUpdate]);

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append('image', file);
		setUploading(true);

		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			};

			const { data } = await axios.post(`/api/upload`, formData, config);

			setImage(data);
			setUploading(false);
		} catch (error) {
			console.log(error);
			setUploading(false);
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();
		let descriptionConvertedData = convertToRaw(
			description.getCurrentContent()
		);
		dispatch(
			updateArticle({
				_id: articleId,
				title,
				image,
				content: descriptionConvertedData,
				category,
			})
		);
	};

	return (
		<>
			<Link to="/admin/articlelist" className="btn btn-light my-3">
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit Article</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="image">
							<Form.Label>Image</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter image URL"
								value={image}
								onChange={(e) => setImage(e.target.value)}
							></Form.Control>
							<Form.File
								id="image-file"
								label="Choose file"
								custom
								onChange={uploadFileHandler}
							></Form.File>
							{uploading && <Loader />}
						</Form.Group>

						<Form.Group controlId="content">
							<Form.Label>Content</Form.Label>
							<Editor
								editorState={description}
								wrapperClassName="wrapper-class"
								editorClassName="editor-class"
								onEditorStateChange={(editorState) =>
									setDescription(editorState)
								}
							/>
						</Form.Group>

						<Form.Group controlId="category">
							<Form.Label>Category</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter category"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Button type="submit" variant="primary">
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default ArticleEditScreen;
