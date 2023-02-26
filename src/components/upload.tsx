import { useFormik } from "formik";
import React, { useCallback, useMemo, useRef, useState } from "react";
import states from "../assets/json/states.json";
import lgas from "../assets/json/lgas.json";
import wards from "../assets/json/wards.json";
import router from "../router";
import { useNavigate } from "react-router-dom";
import Modal from "./modal";
import db from "../assets/firebase";
import { addDoc, collection } from "firebase/firestore/lite";

interface Props {
  show: boolean;
  toggle: (state: boolean) => void;
}

const UploadModal: React.FC<Props> = ({ show, toggle }) => {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const form = useFormik({
    initialValues: {
      lga: null,
      state: null,
      ward: null,
    },
    onSubmit: async (values) => {
      const { lga, ward, state } = values;

      try {
        const wardsCollection = collection(db, "wards");
        const docRef = await addDoc(wardsCollection, {
          ward_code: `${state}-${lga}-${ward}`,
          images,
        });

        alert(`Ward ${ward} Successfully uploaded`);
        toggle(false);
        form.resetForm();
      } catch (err) {
        alert(`Something went wrong please try again`);
      }
      // navigate(`/search?state=${state}&lga=${lga}&ward=${ward}`);
      // form.resetForm();
    },
  });

  const { lga, ward, state } = form.values;

  const lgaOptions = useMemo(
    () => (state ? lgas.filter((lga) => lga.state_id === state).map((l) => ({ text: l.name, value: l.lga_id })) : []),
    [state]
  );
  const wardOptions = useMemo(
    () =>
      lga
        ? (wards as { lga_id: number; ward_id: number; name: string }[])
            .filter((ward) => ward.lga_id === lga)
            .map((w) => ({ text: w.name, value: w.ward_id }))
        : [],
    [lga]
  );

  const clearLga = () => {
    form.setFieldValue("lga", null);
    form.setFieldValue("ward", null);
  };

  const clearWard = () => {
    form.setFieldValue("ward", null);
  };

  const submitEnabled = state && ward && lga && images.length > 0;

  var myWidget = (window as any)?.cloudinary.createUploadWidget(
    {
      cloudName: cloudName,
      uploadPreset: uploadPreset,
      // cropping: true, //add a cropping step
      // showAdvancedOptions: true,  //add advanced options (public_id and tag)
      // sources: [ "local", "url"], // restrict the upload sources to URL and local files
      // multiple: false,  //restrict upload to a single file
      // folder: "user_images", //upload files to the specified folder
      // tags: ["users", "profile"], //add the given tags to the uploaded files
      // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
      // clientAllowedFormats: ["images"], //restrict uploading to image files only
      // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
      // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
      // theme: "purple", //change to a purple theme
    },
    (error: any, result: any) => {
      if (!error && result && result.event === "success") {
        setImages((i) => [...i, result.info.secure_url]);
        // document
        //   .getElementById("uploadedimage")
        //   .setAttribute("src", result.info.secure_url);
      }
    }
  );

  return (
    <Modal {...{ show, toggle }}>
      <form className="w-full mt-5" onSubmit={form.handleSubmit}>
        <select
          name="state"
          id="state"
          className="form-input"
          onChange={(e) => {
            clearLga();
            form.setFieldValue("state", Number(e.target?.value));
          }}
        >
          <option value="">Please select a state</option>
          {statesOptions.map((s) => (
            <option value={s.value}>{s.text}</option>
          ))}
        </select>

        {state && (
          <select
            name="lga"
            id="lga"
            className="form-input"
            onChange={(e) => {
              clearWard();
              form.setFieldValue("lga", Number(e.target?.value));
            }}
          >
            <option value="">Select an LGA</option>
            {lgaOptions.map((s) => (
              <option value={s.value}>{s.text}</option>
            ))}
          </select>
        )}
        {lga && (
          <select
            name="ward"
            id="ward"
            className="form-input"
            onChange={(e) => {
              clearWard();
              form.setFieldValue("ward", Number(e.target?.value));
            }}
          >
            <option value="">Select a ward</option>
            {wardOptions.map((s) => (
              <option value={s.value}>{s.text}</option>
            ))}
          </select>
        )}
        <button
          className="bg-gray-700 text-white font-semibold w-full py-3.5 mt-4 rounded-md"
          onClick={() => myWidget.open()}
          type="button"
        >
          {images.length > 0 ? `Added ${images.length} images` : "Add Result Images 📄"}
        </button>
        <div className="sticky bottom-0 border-t border-gray-100 mt-5 pt-2.5 pb-4">
          <button
            className="w-full py-3.5 flex items-center bg-primary rounded-lg text-white text-center text-sm font-semibold justify-center disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
            disabled={!submitEnabled}
          >
            Upload
          </button>
        </div>
      </form>
    </Modal>
  );
};

const statesOptions = states.map((s) => {
  return {
    text: s.name,
    value: s.state_id,
  };
});

const cloudName = "elections-watch"; // replace with your own cloud name
const uploadPreset = "l0coardg"; // replace with your own upload preset

export default UploadModal;
