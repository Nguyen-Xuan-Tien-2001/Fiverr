import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

import './AllProduct.css'
import Footer from '../../components/Footer/footer'
import { Products } from '../../components/Products/Products'
import { SlidePageProduct } from '../../components/SlidePageProduct/SlidePageProduct'

import { SearchJob } from '../../components/SearchJob/SearchJob'
import { GetAllCongViecService } from '../../ApiServices/GetDataApi/GetAllCongViec'

//API Tìm kiếm
import { TimKiemByDiaChiService } from '../../ApiServices/TimKiem/TimKiemByDiaChi'
import { TimKiemByLuongService } from '../../ApiServices/TimKiem/TimKiemByLuong'
import { TimKiemByTenService } from '../../ApiServices/TimKiem/TimKiemByTen'


const AllProducts = () => {
  //call API
  const { GetAllCongViecResponse, GetAllCongViecRefetch } = GetAllCongViecService();

  const { TimKiemByDiaChiResponse, callTimKiemByDiaChiRefetch } = TimKiemByDiaChiService();
  const { TimKiemByLuongResponse, callTimKiemByLuongRefetch } = TimKiemByLuongService();
  const { TimKiemByTenResponse, callTimKiemByTenRefetch } = TimKiemByTenService();
  const [dataCongViec, setDataCongViec] = useState([])

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let tenCViec = searchParams.get('tenCViec');
  let diachiId = searchParams.get('diachiId');
  let minSalary = searchParams.get('minSalary');
  let maxSalary = searchParams.get('maxSalary');

  useEffect(() => {
    if (tenCViec) {
      callTimKiemByTenRefetch(tenCViec);
    }
    if (diachiId) {
      if (diachiId === '0') {
        setDataCongViec(GetAllCongViecResponse?.data)
        return;
      }
      callTimKiemByDiaChiRefetch(diachiId);
    }
    if (minSalary && maxSalary) {
      callTimKiemByLuongRefetch(minSalary, maxSalary);
    }
  }, [diachiId, tenCViec, maxSalary, minSalary]);

  useEffect(() => {
    if (TimKiemByTenResponse || TimKiemByLuongResponse || TimKiemByDiaChiResponse) {
      if (TimKiemByTenResponse) {
        setDataCongViec(TimKiemByTenResponse);
      }
      else if (TimKiemByLuongResponse) {
        setDataCongViec(TimKiemByLuongResponse);
      }
      else if (TimKiemByDiaChiResponse) {
        setDataCongViec(TimKiemByDiaChiResponse);
      }
    }
    else {
      setDataCongViec(GetAllCongViecResponse)
    }
  }, [TimKiemByDiaChiResponse, TimKiemByTenResponse, TimKiemByLuongResponse, GetAllCongViecResponse]);

  return (
    <>
      <div className="background_header">
        <SlidePageProduct />

        <SearchJob GetAllCongViecRefetch={GetAllCongViecRefetch} />
      </div>
      {
        dataCongViec?.data ? <Products CongViec={dataCongViec.data} /> :

          <Products />

      }
      <Footer />
    </>
  )
}
export default AllProducts
