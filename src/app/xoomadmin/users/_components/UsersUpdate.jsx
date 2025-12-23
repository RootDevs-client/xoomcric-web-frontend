'use client';

import GlobalLoading from '@/components/Global/GlobalLoading';
import { useAuthStore } from '@/lib/auth-store';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import useGetSingleUser from '@/lib/hooks/admin/useGetSingleUser';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaHome } from 'react-icons/fa';
import { ImSpinner6 } from 'react-icons/im';
import * as Yup from 'yup';

export default function UsersUpdate({ id }) {
  const { token } = useAuthStore();
  const { singleUser, singleUserLoading } = useGetSingleUser(token, id);
  const [userImage, setUserImage] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (singleUser) {
      setInitialValues({
        phone: singleUser.phone || '',
        membershipPlan: singleUser.membershipPlan || '',
        paid: singleUser.paid || false,
        expiresAt: singleUser.expiresAt
          ? new Date(singleUser.expiresAt * 1000).toISOString().split('T')[0]
          : '',
        status: singleUser.status || '1',
        image: singleUser.image || '',
      });

      setShowImage(!!singleUser.image);
    }
  }, [singleUser]);

  const userSchema = Yup.object().shape({
    membershipPlan: Yup.string().required('Required'),
    expiresAt: Yup.string().required('Required'),
    status: Yup.string().required('Required'),
  });

  const handleSubmit = async (values) => {
    setFormSubmitting(true);

    try {
      let uploadedImageUrl = values.image;

      if (userImage) {
        const formData = new FormData();
        formData.append('file', userImage);
        formData.append('upload_preset', 'XoomCric');

        const { data } = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );

        uploadedImageUrl = data.secure_url;
      }

      const payload = {
        membershipPlan: values.membershipPlan,
        paid: values.paid,
        expiresAt: Math.floor(new Date(values.expiresAt).getTime() / 1000),
        status: values.status,
        image: uploadedImageUrl,
      };

      const { data: res } = await xoomBackendUrl.put(
        `/api/admin/users/${id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status) {
        toast.success('User updated successfully');
        router.push('/xoomadmin/users');
      }
    } catch (err) {
      toast.error('Failed to update user');
      setFormSubmitting(false);
    }
  };

  return (
    <div>
      <div className="text-sm breadcrumbs p-5">
        <ul>
          <li>
            <Link href="/xoomadmin/dashboard">
              <FaHome className="text-xl" />
            </Link>
          </li>
          <li>
            <Link href="/xoomadmin/users">Users</Link>
          </li>
          <li className="font-medium">Update</li>
        </ul>
      </div>

      <div className="card w-full bg-white shadow-md px-5 py-10 mt-5">
        <h2 className="card-title mb-5">Update User</h2>

        {singleUserLoading ? (
          <GlobalLoading />
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={userSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {() => (
              <Form className="grid grid-cols-12 gap-5">
                {/* Phone (Read-only) */}
                <div className="col-span-6">
                  <label className="form-control">
                    <span className="label-text font-medium">Phone</span>
                    <Field
                      name="phone"
                      disabled
                      className="input input-bordered bg-gray-100"
                    />
                  </label>
                </div>

                {/* Membership Plan */}
                <div className="col-span-6">
                  <label className="form-control">
                    <span className="label-text font-medium">
                      Membership Plan *
                    </span>
                    <Field
                      name="membershipPlan"
                      className="input input-bordered"
                    />
                    <ErrorMessage
                      name="membershipPlan"
                      component="div"
                      className="text-sm text-red-600"
                    />
                  </label>
                </div>

                {/* Paid */}
                <div className="col-span-4">
                  <label className="form-control">
                    <span className="label-text font-medium">Payment</span>
                    <Field
                      as="select"
                      name="paid"
                      className="select select-bordered"
                    >
                      <option value={true}>Paid</option>
                      <option value={false}>Unpaid</option>
                    </Field>
                  </label>
                </div>

                {/* Expiry */}
                <div className="col-span-4">
                  <label className="form-control">
                    <span className="label-text font-medium">Expires At *</span>
                    <Field
                      type="date"
                      name="expiresAt"
                      className="input input-bordered"
                    />
                  </label>
                </div>

                {/* Status */}
                <div className="col-span-4">
                  <label className="form-control">
                    <span className="label-text font-medium">Status *</span>
                    <Field
                      as="select"
                      name="status"
                      className="select select-bordered"
                    >
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </Field>
                  </label>
                </div>

                {/* Submit */}
                <div className="col-span-12 text-right">
                  <button
                    type="submit"
                    className="btn btn-success btn-sm"
                    disabled={formSubmitting}
                  >
                    Update User
                    {formSubmitting && (
                      <ImSpinner6 className="ml-2 animate-spin" />
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
}
