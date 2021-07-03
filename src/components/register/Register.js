import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom'
import { pick, get } from 'lodash'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CFormGroup,
  CInvalidFeedback
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import AuthServices from '../../services/AuthServices';
import swal from 'sweetalert';

const Register = () => {
  const history = useHistory();
  const { register, control, errors, handleSubmit } = useForm({});
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const validateMatchedPass = (value) => {
    if (value != password || value != confirmPass) {
      return 'Vui lòng kiểm tra lại mật khẩu'
    }
  }

  const onSubmit = data => {
    const info = pick(data, [
      'username',
      'email',
      'password',
    ]);

    const body = {
      username: info.username,
      email: info.email,
      password: info.password,
    }

    registerTutor(body);
  }

  const registerTutor = async (body) => {
    try {
      const result = await AuthServices.registerTutor(body);
      if (result.status == 201) {
        swal({ title: "Thành công", text: 'Đăng ký thành công. Vui lòng chờ xác nhận !', icon: 'success', button: 'Đồng ý' }).then(res => {
          history.replace(`/login`);
        })
      }
    } catch (error) {
      swal({ title: "Lỗi", text: 'Đăng ký thất bại !', icon: 'error', button: 'Đồng ý' })
    }
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                    <h1>Đăng Ký</h1>
                    <p className="text-muted">Tạo tài khoản giáo viên</p>
                  </div>
                  <CFormGroup>
                    <Controller
                      control={control}
                      id="username"
                      name="username"
                      rules={{
                        required: 'Vui lòng nhập tên đăng nhập !',
                      }}
                      render={({ onChange }) => (
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-user" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            placeholder="Tên đăng nhập"
                            onChange={e => onChange(e.target.value)}
                            invalid={!!errors.username}
                          />
                        </CInputGroup>
                      )}
                    />
                    <CInvalidFeedback className="help-block">
                      {get(errors, `name.username`, '')}
                    </CInvalidFeedback>
                  </CFormGroup>

                  <CFormGroup>
                    <Controller
                      control={control}
                      id="email"
                      name="email"
                      rules={{
                        required: 'Vui lòng nhập email !',
                      }}
                      render={({ onChange }) => (
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-envelope-closed" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            placeholder="Email"
                            onChange={e => onChange(e.target.value)}
                            invalid={!!errors.email}
                          />
                        </CInputGroup>
                      )}
                    />
                    <CInvalidFeedback className="help-block">
                      {get(errors, `name.email`, '')}
                    </CInvalidFeedback>
                  </CFormGroup>

                  <CFormGroup>
                    <Controller
                      control={control}
                      id="password"
                      name="password"
                      rules={{
                        required: 'Vui lòng nhập mật khẩu !',
                        validate: value => validateMatchedPass(value)
                      }}
                      render={({ onChange }) => (
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="password" placeholder="Mật khẩu" autoComplete="new-password"
                            onChange={e => { onChange(e.target.value); setPassword(e.target.value) }}
                            invalid={!!errors.password}
                          />
                        </CInputGroup>
                      )}
                    />
                    <CInvalidFeedback className="help-block">
                      {get(errors, `name.password`, '')}
                    </CInvalidFeedback>
                  </CFormGroup>

                  <CFormGroup>
                    <Controller
                      control={control}
                      id="repeatpassword"
                      name="repeatpassword"
                      rules={{
                        required: 'Vui lòng nhập lại mật khẩu !',
                        validate: value => validateMatchedPass(value)
                      }}
                      render={({ onChange }) => (
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="password" placeholder="Nhập lại mật khẩu" autoComplete="new-password"
                            onChange={e => { onChange(e.target.value); setConfirmPass(e.target.value) }}
                            invalid={!!errors.repeatpassword}
                          />
                        </CInputGroup>
                      )}
                    />
                    <CInvalidFeedback className="help-block">
                      {get(errors, `name.repeatpassword`, '')}
                    </CInvalidFeedback>
                  </CFormGroup>
                  <CButton block type="submit" color="primary" onClick={handleSubmit(onSubmit)}>Đăng ký</CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
