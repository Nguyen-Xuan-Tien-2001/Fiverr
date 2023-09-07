import React, { useEffect } from 'react';
import { Space, Button, Tag, message } from 'antd';
import { useParams } from 'react-router-dom';

import TableCustom from '../../../../../components/TableCustom/TableCustom';
import { Container } from 'react-bootstrap';
import UserHeader from '../../../../../components/user/userHeader/userHeader';
import { GetDSUngVienByCVIECService } from '../../../../../ApiServices/GetDataApi/GetDSUngVienByCViec';
import { ChuyenTrangThaiService } from '../../../../../ApiServices/UngTuyen/ChuyenTrangThai';


const DSUngVien = () => {

    const { id } = useParams();
    const { GetDsUngVienResponse, GetDsUngVienIsLoading, GetDsUngVienError, GetDsUngVienRefetch } = GetDSUngVienByCVIECService(id);
    const { ChuyenTrangThaiResponse, ChuyenTrangThaiIsLoading, ChuyenTrangThaiError, callChuyenTrangThaiRefetch } = ChuyenTrangThaiService();
    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Đã nhận ứng viên',
        });
    };
    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Đã từ chối ứng viên',
        });
    };

    useEffect(() => {
        if (ChuyenTrangThaiResponse) {
            GetDsUngVienRefetch();
        }
    }, [ChuyenTrangThaiResponse])

    const handleChapNhan = (id) => {
        callChuyenTrangThaiRefetch(id, {
            trangThai: "Đã nhận"
        })
        success();
    };

    const handleTuChoi = (id) => {
        callChuyenTrangThaiRefetch(id, {
            trangThai: "Từ Chối"
        })
        error();
    }


    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Họ',
            render: (_,) => {
                if (_.cv) {
                    return (<a >{_.cv.ho}</a>)
                }
            },
            key: 'ho',
        },
        {
            title: 'Tên',
            key: 'ten',
            render: (_,) => {
                if (_.cv) {
                    return (<a >{_.cv.ten}</a>)
                }
            },

        },
        {
            title: 'Email',
            key: 'email',
            render: (_,) => {
                if (_.cv) {
                    return (<a >{_.cv.email}</a>)
                }
            },
        },
        {
            title: 'SĐT liên hệ',
            key: '',
            render: (_,) => {
                if (_.cv) {
                    return (<a >{_.cv.soDT}</a>)
                }
            }
        },
        {
            title: 'Vị trí ứng tuyển',
            key: 'vitriUngTuyen',
            render: (_,) => {
                if (_.cv) {
                    return (<a >{_.cv.vitriUngTuyen}</a>)
                }
            },
        },
        {
            title: 'Trạng thái',
            key: 'trangThai',
            dataIndex: 'trangThai',
            render: (_,) => (
                <Tag color={_ === 'Đã nộp' ? 'blue' : (_ === 'Đã nhận' ? 'green' : 'red')} key={_}>
                    {_ ? _.toUpperCase() : ''}
                </Tag>
            ),

        },
        {
            title: '',
            key: '',
            render: (_,) => (
                <Space size="middle">
                    <Button onClick={() => (handleChapNhan(_.id))}>Chấp nhận</Button>
                    <Button danger onClick={() => (handleTuChoi(_.id))}>Từ chối</Button>
                </Space>
            ),
        },
    ];


    return (
        <>
            {contextHolder}
            <UserHeader />
            <Container>
                <h3 style={{ margin: '40px 0' }}>Danh sách Ứng viên</h3>
                {GetDsUngVienResponse ? <TableCustom columns={columns} data={GetDsUngVienResponse.data} /> : ''}
            </Container>
        </>
    )
};
export default DSUngVien;