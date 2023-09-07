import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { faSearch, faTruckRampBox, faSearchLocation, faDollar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from 'react-router'
import { Select } from 'antd'

import { GetAllChiNhanhService } from '../../ApiServices/GetDataApi/GetAllChiNhanh';


import './SearchJob.css'

export const SearchJob = ({ GetAllCongViecRefetch }) => {
  const { GetAllChiNhanhResponse, GetAllChiNhanhIsLoading, GetAllChiNhanhError, GetAllChiNhanhRefetch } = GetAllChiNhanhService()

  const { Option } = Select;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    TenCViec: "",
    DiaChi: "",
    ChuyenNganh: "",
    Luong: "",
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (formData.TenCViec !== "") {
      navigate(`/user?tenCViec=${formData.TenCViec}`);
    }
    if (formData.DiaChi !== "") {
      navigate(`/user?diachiId=${formData.DiaChi}`);
    }
    if (formData.Luong !== "") {
      if (formData.Luong === "1") {
        navigate(`/user?minSalary=0&maxSalary=100`);
      }
      else if (formData.Luong === "2") {
        navigate(`/user?minSalary=100&maxSalary=1000`);
      }
      else if (formData.Luong === "3") {
        navigate(`/user?minSalary=1000&maxSalary=2000`);
      }
      else if (formData.Luong === "4") {
        navigate(`/user?minSalary=2000&maxSalary=999999`);
      }
      else {
        navigate(`/user?minSalary=0&maxSalary=999999`);
      }

    }
    // GetAllCongViecRefetch();
    setFormData({
      TenCViec: "",
      DiaChi: "",
      ChuyenNganh: "",
      Luong: "",
    })
  }
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };



  return (
    <div className='container'>
      <Form onSubmit={handleOnSubmit} className='FormSearch'>
        <Form.Group className="" >
          <Form.Label>
            <FontAwesomeIcon icon={faSearch} size="1x" color="black" id="searchIcon" />
          </Form.Label>
          <Form.Control onChange={handleChange} name='TenCViec' type="text" placeholder="Phân tích nghiệp vụ" />
        </Form.Group>
        <div>
          <Form.Label>
            <FontAwesomeIcon icon={faSearchLocation} size="1x" color="black" id="searchIcon" />
          </Form.Label>
          <Form.Select name='DiaChi' onChange={handleChange} aria-label="DiaChi">
            <option value={0}>Tất cả địa chỉ</option>
            {
              GetAllChiNhanhResponse ? GetAllChiNhanhResponse?.data?.map((data) => {
                return (
                  <option value={data.id}>{data.tenDC}</option>
                )
              }) : ''
            }
          </Form.Select>
        </div>
        <div>
          <Form.Label>
            <FontAwesomeIcon icon={faTruckRampBox} size="1x" color="black" id="searchIcon" />
          </Form.Label>
          <Form.Select name='ChuyenNganh' onChange={handleChange} aria-label="ChuyenNganh">
            <option value="0">Tất cả ngành nghề</option>
            <option value="1">Front End Developer</option>
            <option value="2">Back End Developer</option>
            <option value="3">Marketing</option>
          </Form.Select>
        </div>
        <div>
          <Form.Label>
            <FontAwesomeIcon icon={faDollar} size="1x" color="black" id="searchIcon" />
          </Form.Label>
          <Form.Select name='Luong' onChange={handleChange} aria-label="Luong">
            <option value={0} >Tất cả mức lương</option>
            <option value={1} >Dưới 100$</option>
            <option value={2} >Từ 100$ ~ 1000$</option>
            <option value={3} >Từ 1000$ ~ 2000$</option>
            <option value={4} >Trên 2000$ </option>
          </Form.Select>
        </div>
        <div>
          <Button type='submit' variant='success' className='Search--btn' size='md' block='true'>Tìm kiếm</Button>
        </div>
      </Form>

    </div >
  )
}
