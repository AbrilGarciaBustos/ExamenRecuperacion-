import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Button, TextInput, Label, Spinner } from 'flowbite-react';
import AxiosClient from '../../config/http-client/axios-client';
import { customAlert } from '../../config/alerts/alert';
import AuthContext from '../../config/context/auth-context';

const SignInPage = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      username: yup.string().required('Campo obligatorio'),
      password: yup.string().required('Campo obligatorio'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await AxiosClient({
          url: '/auth/signin',
          method: 'POST',
          data: values,
        });
        console.log(response);
        if (!response.error) {
          /*
                Tienen que validar que rol tiene 
                -> Redireccionarlo a su página principal
            */
          // switch (response.data.roles[0].name) {
          //   case 'ADMIN_ROLE':
          //     dispatch({ type: 'SIGNIN', payload: response.data });
          //     navigate('/admin', { replace: true });
          //     break;
          //   case 'CLIENT_ROLE':
          //     dispatch({ type: 'SIGNIN', payload: response.data });
          //     navigate('/client', { replace: true });
          //     break;
          //   case 'USER_ROLE':
          //     dispatch({ type: 'SIGNIN', payload: response.data });
          //     navigate('/user', { replace: true });
          //     break;
          // }
          dispatch({ type: 'SIGNIN', payload: response.data });
          navigate('/', { replace: true });
        } else throw Error('Error');
      } catch (error) {
        customAlert(
          'Iniciar sesión',
          'Usuario y/o contraseña incorrectos',
          'info'
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <div className={' w-screen h-screen flex justify-center'}>
        <section className="bg-gray-50 dark:bg-gray-900 w-full  max-w-lg">
          <div
            className="flex flex-col items-center px-4 mx-auto"
            style={{ marginTop: '5rem' }}
          >
            <div className="flex items-center my-2 rounded-full">
              <img
                style={{ height: '15rem', width: 'auto' }}
                src="/assets/logo.png"
                alt="logo"
              />
            </div>
            <div className="w-full bg-white rounded-lg shadow shadow-zinc-300 dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Almacen App
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={formik.handleSubmit}
                  noValidate
                >
                  <div>
                    <Label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Usuario
                    </Label>
                    <TextInput
                      type="text"
                      name="username"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.errors.username && formik.touched.username ? (
                          <span className="text-red-600">
                            {formik.errors.username}
                          </span>
                        ) : null
                      }
                      id="username"
                      placeholder="erielit"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Contraseña
                    </Label>
                    <TextInput
                      type="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.errors.password && formik.touched.password ? (
                          <span className="text-red-600">
                            {formik.errors.password}
                          </span>
                        ) : null
                      }
                      id="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <a
                      href="#"
                      className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                  <Button
                    type="submit"
                    color="light"
                    className="w-full"
                    disabled={formik.isSubmitting || !formik.isValid}
                  >
                    {formik.isSubmitting ? (
                      <Spinner />
                    ) : (
                      <>
                        <svg
                          className="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
                          />
                        </svg>
                        Iniciar sesión
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SignInPage;