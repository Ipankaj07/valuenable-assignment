import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Illustration from "../Illustration/Illustration";

const initialValues = {
  dob: "1998-01-01",
  gender: "M",
  sumAssured: "120000",
  modalPremium: "12000",
  premiumFrequency: "Yearly",
  policyTerm: "18",
  policyPaymentTerm: "10",
};

const validationSchema = Yup.object().shape({
  dob: Yup.date()
    .min(new Date("01/01/1965"), "Age should be between 23 and 56")
    .max(new Date("01/01/1998"), "Age should be between 23 and 56")
    .required("Date of Birth is required"),
  gender: Yup.string().required("Gender is required"),
  sumAssured: Yup.number()
    .max(5000000, "Sum Assured should be less than 5000000")
    .min(
      10 * +initialValues.modalPremium,
      "Sum Assured should be greater than 10 times Premium Amount",
    )
    .required("Sum Assured is required"),
  modalPremium: Yup.number()
    .min(10000, "Modal Premium should be greater than 10000")
    .max(50000, "Modal Premium should be less than 50000")
    .required("Modal Premium is required"),
  premiumFrequency: Yup.string().required("Premium Frequency is required"),
  policyTerm: Yup.number()
    .min(10, "Policy Term should be greater than 10")
    .max(20, "Policy Term should be less than 20")
    .required("Policy Term is required"),
  policyPaymentTerm: Yup.number()
    .min(5, "Policy Payment Term should be greater than 5")
    .max(10, "Policy Payment Term should be less than 10")
    .required("Policy Payment Term is required"),
});

function TermInsuranceCalculator() {
  const [values, setValues] = React.useState({});

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-4">
        <h1 className="text-4xl font-bold">
          Term Insurance
          <span className="text-blue-500 mx-2 ">Calculator</span>
        </h1>
      </div>

      <div className="mb-6">
        <p className="text-2sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptates, quod, quia, voluptate quae voluptatem quibusdam
          exercitationem voluptas quas quidem quos. Quisquam, quae. Quisquam
          voluptates, quod, quia, voluptate quae voluptatem quibusdam
          exercitationem voluptas quas quidem quos. Quisquam, quae.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setValues(values);
          // console.log(values);
        }}
      >
        {({ handleSubmit }) => (
          <div className="bg-white shadow-md text-black rounded px-8 pt-6 pb-8 mb-4 w-full">
            <Form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="label text-blue-500">*Date Of Birth</div>
                  <Field name="dob" type="date" className="input-field" />
                  <ErrorMessage
                    name="dob"
                    component="div"
                    className="error-msg"
                  />
                </div>
                <div>
                  <div className="label text-blue-500">Gender</div>
                  <Field
                    name="gender"
                    component="select"
                    className="input-field"
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="error-msg"
                  />
                </div>
                <div>
                  <div className="label text-blue-500">*Life Cover Amount</div>
                  <Field
                    name="sumAssured"
                    type="number"
                    placeholder="Sum Assured"
                    className="input-field"
                  />
                  <ErrorMessage
                    name="sumAssured"
                    component="div"
                    className="error-msg"
                  />
                </div>
                <div>
                  <div className="label text-blue-500">*Premium Amount</div>
                  <Field
                    name="modalPremium"
                    type="number"
                    placeholder="Modal Premium"
                    className="input-field"
                  />
                  <ErrorMessage
                    name="modalPremium"
                    component="div"
                    className="error-msg"
                  />
                </div>
                <div>
                  <div className="label text-blue-500">Premium Frequency</div>
                  <Field
                    name="premiumFrequency"
                    component="select"
                    className="input-field"
                  >
                    <option value="Yearly">Yearly</option>
                    <option value="Half-Yearly">Half-Yearly</option>
                    <option value="Monthly">Monthly</option>
                  </Field>
                  <ErrorMessage
                    name="premiumFrequency"
                    component="div"
                    className="error-msg"
                  />
                </div>
                <div>
                  <div className="label text-blue-500">
                    *Policy Term ( Years )
                  </div>
                  <Field
                    name="policyTerm"
                    type="number"
                    placeholder="Policy Term"
                    className="input-field"
                  />
                  <ErrorMessage
                    name="policyTerm"
                    component="div"
                    className="error-msg"
                  />
                </div>
                <div>
                  <div className="label text-blue-500">
                    *Policy Payment Term ( Years )
                  </div>
                  <Field
                    name="policyPaymentTerm"
                    type="number"
                    placeholder="Policy Payment Term"
                    className="input-field"
                  />
                  <ErrorMessage
                    name="policyPaymentTerm"
                    component="div"
                    className="error-msg"
                  />
                </div>
                <div>
                  <button
                    className="mt-6 w-full bg-blue-500 hover:bg-blue-400 text-white 
                    font-bold py-2 px-4 rounded"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>

      <div className="bg-white shadow-md text-black rounded px-8 pt-6 pb-8 mb-4 w-full">
        <Illustration data={values} />
      </div>
    </div>
  );
}

export default TermInsuranceCalculator;
