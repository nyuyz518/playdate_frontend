import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function renderDatePicker ({input, label, placeholder, defaultValue, meta: {touched, error} }) {
  return (
      <div>
        <label>{label}</label>
        <DatePicker
           className="w3-input w3-border"
           selected={input.value.date}
           onChange={(date)=>{
             return input.onChange({date: date});
           }}
           showTimeSelect
           timeFormat="HH:mm"
           timeIntervals={60}
           dateFormat="MM/d, yyyy h:mm aa"
           timeCaption="time"
          />
          <div className="text-help w3-red">
            {touched ? error : " "}
          </div>
      </div>
  );
}

export function renderTextField(field){
  return(
    <div className="form-group">
      <label>{field.label}</label>
      <input
          className="w3-input w3-border"
          type="text"
          {...field.input}
      />
      <div className="text-help red">
        {field.meta.touched ? field.meta.error : " "}
      </div>
    </div>
  );
}

export function renderDropzone(field){
  const value = field.input.value;
    return (
      <div>
        <Dropzone
          name={field.name}
          multiple={false}
          accept=".jpeg,.jpg,.png"
          onDrop={(accepted, rejected) => {
            let images = [];
            accepted.forEach((file: any) => {
              const reader: FileReader = new FileReader();
              reader.onload = () => {
                  let fileAsBase64: any = "data:" + file.type + ";base64," +reader.result.substr(reader.result.indexOf(",") + 1);

                  images.push(fileAsBase64);
              };

              reader.onabort = () => console.log("file reading was aborted");
              reader.onerror = () => console.log("file reading has failed");

              reader.readAsDataURL(file);
            });
            field.input.onChange({images: images});
          }}
        >
          <div>Drop your picture here</div>

        </Dropzone>
        <div>{value.images&&
          <img src={value.images[0]}/>
        }
        </div>
        {field.meta.touched && field.meta.error &&
          <span className="error">{field.meta.error}</span>}
      </div>
    );
}
