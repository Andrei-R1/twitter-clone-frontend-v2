import { gql, useMutation, useQuery } from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import Modal from "react-modal";
import { ME_QUERY } from "../pages/Profile";
import { customStyles } from "../styles/CustomModalStyles";

const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $id: Int!
    $bio: String
    $location: String
    $website: String
    $avatar: String
  ) {
    updateProfile(
      id: $id
      bio: $bio
      location: $location
      website: $website
      avatar: $avatar
    ) {
      id
    }
  }
`;

interface ProfileValues {
  id: number;
  bio: string;
  location: string;
  website: string;
  avatar: string;
}

function UpdateProfile() {
  const { loading, error, data } = useQuery(ME_QUERY);

  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    refetchQueries: [{ query: ME_QUERY }],
  });
  const [modalIsOpen, setIsOpen] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  const initialValues: ProfileValues = {
    id: data.me.profile.id,
    bio: data.me.profile.bio,
    location: data.me.profile.location,
    website: data.me.profile.website,
    avatar: data.me.profile.avatar,
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal} className="edit-button">
        Edit Profile
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
        style={customStyles}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            await updateProfile({
              variables: { ...values },
            });

            setSubmitting(false);
            setIsOpen(false);
          }}
        >
          <Form>
            <Field name="avatar" type="text" placeholder="Avatar" />
            <ErrorMessage name="avatar" component={"div"} />
            <Field name="bio" type="text" as="textarea" placeholder="Bio" />
            <ErrorMessage name="bio" component={"div"} />
            <Field name="location" type="text" placeholder="Location" />
            <ErrorMessage name="location" component={"div"} />
            <Field name="website" type="text" placeholder="Website" />
            <ErrorMessage name="website" component={"div"} />

            <button onClick={openModal} className="edit-button">
              Edit Profile
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
}

export default UpdateProfile;
