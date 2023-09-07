import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useEffect } from 'react'
import { useState } from 'react'

import './PostARequest.css'
import Footer from '../../../../components/Footer/footer'
import img_postARequest from '../../../../accets/img_form/img_postRequest.jpg'
import { data } from '../../../../data.js'
import UserHeader from '../../../../components/user/userHeader/userHeader'
import { GetCTYByHRService } from '../../../../ApiServices/GetDataApi/getMyCongTy'
import { TaoBaiDangService } from '../../../../ApiServices/PostDataApi/TaoBaiDang'

const PostARequest = () => {
    const navigate = useNavigate();
    const [idChiNhanh, setIdChiNhanh] = useState(0);
    const { GetCTYByHRResponse, GetCTYByHRIsLoading, GetCTYByHRError, GetCTYByHRRefetch } = GetCTYByHRService();
    const { TaoBaiDangResponse, TaoBaiDangIsLoading, TaoBaiDangError, callTaoBaiDangRefetch } = TaoBaiDangService();

    useEffect(() => {
        if (GetCTYByHRResponse) {
            setIdChiNhanh(GetCTYByHRResponse.data[0].id);
        }
        if (TaoBaiDangResponse) {
            navigate('/user/myPost')
        } else if (TaoBaiDangError) {
            alert('Đăng tuyển không thành công')
        }
    }, [GetCTYByHRResponse, TaoBaiDangResponse, TaoBaiDangError])

    const [formData, setFormData] = useState({});

    const [hidden, setHidden] = useState(true);
    const handleClickNext = () => {
        setHidden(!hidden);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        callTaoBaiDangRefetch(formData);
    }

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
            chinhanh: {
                id: idChiNhanh
            },
            trangThai: "Còn hạn",
        })
        );
    };

    return (
        <>
            <UserHeader />
            <div className="container">
                <div className="step">
                    <div className="step_detail active">
                        <span className="step_number">
                            1
                        </span>
                        <span className="step_description">
                            Mô tả ngắn gọn
                        </span>
                    </div>
                    <div className={hidden ? "step_detail color-gray" : "step_detail color-gray active"}>
                        <span className={hidden ? "step_number step_number2" : "step_number "}>
                            2
                        </span>
                        <span className="step_description">
                            Mô tả chi tiết
                        </span>
                    </div>
                </div>

                <div className="content">
                    <div className="title">
                        <h1>Bước đầu tạo bài đăng...</h1>
                        <p className="content_description">
                            Let's gooooooo!!!
                        </p>
                        <img src={img_postARequest} alt="Img" />
                    </div>
                    <div className="form">
                        <div className="form_header">
                            <span>Bạn có phải là ứng viên ? </span>
                            <Link to="/user">Trở thành ứng viên</Link>
                        </div>
                        <Form>
                            {hidden ? <>
                                <Form.Group className="mb-3" controlId="formTitle">
                                    <Form.Label><h5>Tên công việc</h5></Form.Label>
                                    <Form.Label>Giữ cho nó ngắn gọn và đơn giản - điều này sẽ giúp chúng tôi kết hợp bạn với danh mục phù hợp.</Form.Label>
                                    <Form.Control onChange={handleChange} name='tenCViec' type="text" placeholder="Ví dụ: Phân tích nghiệp vụ (BA)" />

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formSelect_Category">
                                    <h5>Công ty tuyển:</h5>
                                    <Form.Label>Công ty của bạn tuyển nhân lực.</Form.Label>

                                    <Form.Control readOnly  type="text" placeholder={GetCTYByHRResponse ? GetCTYByHRResponse.data[0].tenCty : ''} />

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formSelect_Category">
                                    <h5>Chi nhánh :</h5>
                                    <Form.Label>Chi nhánh công ty.</Form.Label>
                                    <Form.Control readOnly  type="text" placeholder={GetCTYByHRResponse ? GetCTYByHRResponse.data[0].tenDC : ''} />

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="">
                                    <Form.Label><h5>Lương [$]</h5></Form.Label>
                                    <Form.Control onChange={handleChange} name='luong' type="number" placeholder="1000" min={100} />
                                </Form.Group>


                                <Button style={{ float: 'right' }} variant="success" onClick={handleClickNext}>
                                    Tiếp tục
                                </Button>
                            </> : ''}

                            {hidden ? '' : <>
                                <Form.Group className="mb-3" controlId="">
                                    <Form.Label><h5>Mô tả công việc</h5></Form.Label>
                                    <Form.Control onChange={handleChange} as="textarea" rows={3} name='moTa' placeholder="Mô tả công việc của bạn" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="">
                                    <Form.Label><h5>Yêu cầu Ứng viên</h5></Form.Label>
                                    <Form.Control onChange={handleChange} as="textarea" rows={3} name='yeuCau' placeholder="Yêu cầu..." />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="">
                                    <Form.Label><h5>Số lượng tuyển</h5></Form.Label>
                                    <Form.Control onChange={handleChange} name='soluong' type="number" placeholder="Ví dụ: 5 người" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="">
                                    <Form.Label><h5>Hạn nộp hồ sơ</h5></Form.Label>
                                    <Form.Control onChange={handleChange} name='hanUngTuyen' type="date" />
                                </Form.Group>
                                <Button variant="warning" onClick={handleClickNext}>
                                    Quay lại
                                </Button>
                                <Button onClick={handleSubmit} style={{ float: 'right' }} variant="success">
                                    Xác nhận
                                </Button>
                            </>}
                        </Form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default PostARequest
