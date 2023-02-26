import { useFormik } from "formik";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import states from "../assets/json/states.json";
import lgas from "../assets/json/lgas.json";
import wards from "../assets/json/wards.json";
import router from "../router";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const form = useFormik({
    initialValues: {
      lga: null,
      state: null,
      ward: null,
    },
    onSubmit: (values) => {
      const { lga, ward, state } = values;
      navigate(`/search?state=${state}&lga=${lga}&ward=${ward}`, { replace: true });
      form.resetForm();
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

  const submitEnabled = state && ward && lga;

  return (
    <form className="w-full mt-5" action="/search">
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
      <div className="sticky bottom-0 border-t border-gray-100 mt-5 pt-2.5 pb-4">
        <button
          className="w-full py-3.5 flex items-center bg-primary rounded-lg text-white text-center text-sm font-semibold justify-center disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
          disabled={!submitEnabled}
        >
          Search
        </button>
      </div>
    </form>
  );
};

const statesOptions = states.map((s) => {
  return {
    text: s.name,
    value: s.state_id,
  };
});

export default Search;
