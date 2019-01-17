import validator from "validator";
import isEmpty from "lodash.isempty";
import MeetupModel from "../resourses/meetup/MeetupModel";

export const validateAddQuestion = (req, res, next) => {
  const { user, meetup, title, body } = req.body;
  const error = {};
  if (!user) {
    error.user = "user field is required";
  }

  if (user && !validator.isNumeric(user)) {
    error.user = "user field should be numeric";
  }

  if (!meetup) {
    error.meetup = "meetup field is required";
  }

  if (meetup && !validator.isNumeric(meetup)) {
    error.meetup = "Meetup field is required";
  }

  if (!title) {
    error.title = "title field is required";
  }

  if (title && validator.isEmpty(title.trim())) {
    error.title = "title field is required";
  }

  if (!body) {
    error.body = "body field is required";
  }
  if (body && validator.isEmpty(body.trim())) {
    error.body = "body field is required";
  }

  if (isEmpty(error)) {
    return next();
  }
  return res.status(400).json({ error });
};

export const verifyMeetup = (req, res, next) => {
  const error = {};
  const { meetup } = req.body;
  const found = MeetupModel.meetups.filter(
    meetupObject => meetupObject.id === parseInt(meetup, 10)
  );
  if (found.length === 0) {
    error.meetup = "Meetup does not exist";
    return res.status(404).json({ error });
  }
  return next();
};
