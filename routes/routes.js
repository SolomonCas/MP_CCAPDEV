import { Router } from "express";
import controller from '../controllers/controller.js';
import signup_controller from "../controllers/signup_controller.js";
import authenticate from "../controllers/authenticate.js";
import searchcontroller from '../controllers/searchcontroller.js';
import post_controller from "../controllers/post_controller.js";


const router = Router();
router.get(`/favicon.ico`, controller.getFavicon);
router.get(`/error`, controller.getError);

router.get(`/home`, authenticate.ensureAuthenthicated, controller.getHome);
router.get(`/about`, authenticate.ensureAuthenthicated, controller.getAbout);
router.get(`/profile/:username`, authenticate.ensureAuthenthicated, controller.getProfile);
router.get(`/profile`, authenticate.ensureAuthenthicated, controller.getProfile);
router.get(`/genre`, authenticate.ensureAuthenthicated, controller.getGenre);
router.get(`/forum`, authenticate.ensureAuthenthicated, controller.getForum);
router.get(`/create`, authenticate.ensureAuthenthicated, controller.getCreate);
router.get(`/page/:game`, authenticate.ensureAuthenthicated, controller.getPage);
router.get(`/post/:id`, authenticate.ensureAuthenthicated, controller.getPost);
router.get(`/search/post/:id`, authenticate.ensureAuthenthicated, searchcontroller.searchPost);
router.get(`/search/page/:game`, authenticate.ensureAuthenthicated, searchcontroller.searchPage);
router.get(`/search/profile/:username`, authenticate.ensureAuthenthicated, searchcontroller.searchUser);
router.post(`/logout`, authenticate.ensureAuthenthicated, signup_controller.postLogout);
router.post(`/create`, authenticate.ensureAuthenthicated, controller.postAddPost);
router.get(`/view-posts`, authenticate.ensureAuthenthicated, controller.getAllposts);
router.get(`/view-posts/:username`, authenticate.ensureAuthenthicated, controller.getAllposts);
router.get(`/view-comments`, authenticate.ensureAuthenthicated, controller.getAllcomments);
router.get(`/view-comments/:username`, authenticate.ensureAuthenthicated, controller.getAllcomments);


router.get(`/postComment`, authenticate.ensureAuthenthicated, post_controller.addComment);
router.get(`/deletePost`, authenticate.ensureAuthenthicated, post_controller.deletePost);
router.get(`/editPost`, authenticate.ensureAuthenthicated, post_controller.editPost);
router.get(`/checkUsernamePost`, authenticate.ensureAuthenthicated, post_controller.checkUsername);
router.get(`/vote`,authenticate.ensureAuthenthicated, post_controller.editVotes);
router.get(`/checkUpvote`, authenticate.ensureAuthenthicated, post_controller.isUpvoted);
router.get(`/checkDownvote`, authenticate.ensureAuthenthicated, post_controller.isDownvoted);
router.get(`/addUpvoter`, authenticate.ensureAuthenthicated, post_controller.addUpvoter);
router.get(`/removeUpvoter`, authenticate.ensureAuthenthicated, post_controller.removeUpvoter);
router.get(`/addDownvoter`, authenticate.ensureAuthenthicated, post_controller.addDownvoter);
router.get(`/removeDownvoter`, authenticate.ensureAuthenthicated, post_controller.removeDownvoter);

router.get(`/`, authenticate.ensureNotAuthenthicated, controller.getLogin);
router.get(`/login`, authenticate.ensureNotAuthenthicated, controller.getLogin);
router.get(`/signup`, authenticate.ensureNotAuthenthicated, controller.getSignup);
router.post(`/signup`, authenticate.ensureNotAuthenthicated, signup_controller.postSignUp);
router.post(`/login`, authenticate.ensureNotAuthenthicated, signup_controller.postLogin);


router.get(`/checkEmail`, signup_controller.getCheckEmail);
router.get(`/checkUsername`, signup_controller.getCheckUsername);

router.get(`/CurrUsername`, signup_controller.getCurrUsername); // new
router.get(`/updateProfile`, signup_controller.updateUser); // new
router.post(`/profile`, authenticate.ensureAuthenthicated, signup_controller.updatePicture); // new 


export default router;