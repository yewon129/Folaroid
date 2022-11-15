import React, { useEffect, useState } from 'react';
import {
    Button,
    CardContent,
    TextField,
    TableRow,
    TableCell,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    Paper,
    InputLabel,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useDispatch, useSelector, useStore } from 'react-redux';
import {
    createCertification,
    getCertification,
    deleteCertification,
} from '../../modules/intro/certification';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

const IntroTextField = styled(TextField)`
    .MuiOutlinedInput-root {
        color: white;
        fieldset {
            border-color: white;
        }
        &:hover fieldset {
            border-color: white;
        }
        .Mui-focused fieldset {
            border-color: white;
        }
    }
`;

const IntroInputLabel = styled(InputLabel)`
    color: white;
    margin-bottom: 5px;
`;

const CardHeader = styled.div`
    border-radius: 10px 10px 0 0;
    background-color: rgba(140, 140, 140, 0.35);
    padding: 15px;
    font-size: 1.5rem;
    font-weight: bolder;
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const DeleteBtn = styled.button`
    border-radius: 50%;
    background-color: red;
    width: 18px;
    height: 18px;
    border: red;
`;

const IntroCardContent = styled(CardContent)`
    border-radius: 10px;
    background-color: rgba(44, 43, 43, 1);
    color: white;
    font-size: 1.1rem;
    padding: 20px 50px 20px 50px;
    border-radius: 0 0 10px 10px;
`;

const IntroBox = styled.div`
    width: 80%;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const initialState = {
    certificationDate: null,
    certificationDetail: '',
    certificationId: '',
    certificationIssuer: '',
    certificationName: '',
};
function Input(props) {
    const [box, setBox] = useState(initialState);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBox({ ...box, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(box);
        props.onCreate(box);
        setBox(initialState);
    };

    return (
        <IntroCardContent>
            <form onSubmit={handleSubmit} style={{ margin: '10px' }}>
                <div style={{ width: '100%', marginBottom: '10px' }}>
                    <IntroInputLabel>자격증명</IntroInputLabel>
                    <IntroTextField
                        type="text"
                        placeholder="자격증명"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{ width: '40%' }}
                        name="certificationName"
                        onChange={handleInputChange}
                        value={box.certificationName}
                    />
                </div>
                <div style={{ width: '100%', marginBottom: '10px' }}>
                    <div style={{ width: '100%' }}>
                        <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            sx={{ width: '40%' }}
                        >
                            <IntroInputLabel>취득일자</IntroInputLabel>
                            <DatePicker
                                name="certificationDate"
                                value={box.certificationDate}
                                onChange={(newValue) => {
                                    setBox({
                                        ...box,
                                        certificationDate: dayjs(newValue)
                                            .toISOString()
                                            .substring(0, 10),
                                    });
                                }}
                                renderInput={(params) => (
                                    <IntroTextField {...params} />
                                )}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
                <div style={{ width: '100%', marginBottom: '10px' }}>
                    <IntroInputLabel>자격증 발급 기관</IntroInputLabel>
                    <IntroTextField
                        type="text"
                        placeholder="입력"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{ width: '40%' }}
                        name="certificationIssuer"
                        onChange={handleInputChange}
                        value={box.certificationIssuer}
                    />
                </div>
                <div style={{ width: '100%', marginBottom: '10px' }}>
                    <IntroInputLabel>자격증 고유번호</IntroInputLabel>
                    <IntroTextField
                        type="text"
                        placeholder="입력"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{ width: '40%' }}
                        name="certificationId"
                        onChange={handleInputChange}
                        value={box.certificationId}
                    />
                </div>
                <div
                    style={{
                        width: '100%',
                        marginBottom: '10px',
                    }}
                >
                    <IntroInputLabel>취득 내용</IntroInputLabel>
                    <IntroTextField
                        multiline
                        placeholder="취득내용에 관한 사항을 적어주세요."
                        style={{ width: '90%' }}
                        onChange={handleInputChange}
                        name="certificationDetail"
                        rows={2}
                        maxRows={4}
                        value={box.certificationDetail}
                    />
                </div>
                <div>
                    <Button type="submit" variant="contained">
                        제출
                    </Button>
                </div>
            </form>
        </IntroCardContent>
    );
}

function Read(props) {
    const dispatch = useDispatch();

    const onDeleteClick = (introCertificationNo) => {
        dispatch(deleteCertification(introCertificationNo));
    };

    const rowItems = props.certification.map((item) => (
        <TableRow key={item.introCertificationNo}>
            <TableCell align="center">{item.certificationName}</TableCell>
            <TableCell align="center">{item.certificationDate}</TableCell>
            <TableCell align="center">{item.certificationIssuer}</TableCell>
            <TableCell align="center">{item.certificationId}</TableCell>
            <TableCell align="center">{item.certificationDetail}</TableCell>
            <TableCell
                style={{ display: 'flex', justifyContent: 'center' }}
                algin="center"
            >
                <Button
                    onClick={() => onDeleteClick(item.introCertificationNo)}
                >
                    삭제
                </Button>
            </TableCell>
        </TableRow>
    ));

    return (
        <IntroCardContent>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">자격증명</TableCell>
                            <TableCell align="center">취득일자</TableCell>
                            <TableCell align="center">
                                자격증 발급 기관
                            </TableCell>
                            <TableCell align="center">
                                자격증 고유번호
                            </TableCell>
                            <TableCell align="center">취득내용</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{rowItems}</TableBody>
                </Table>
            </TableContainer>
        </IntroCardContent>
    );
}

function View() {
    const certification = useSelector((state) => state.certification);
    const { pathname } = useLocation();
    const store = useStore();
    const introNo =
        pathname === '/intro'
            ? store.getState().auth.user.intro_no
            : store.getState().portfolio.pf.introNo;
    const [mode, setMode] = useState('CREATE');
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('certification', introNo);
        dispatch(getCertification(introNo));
    }, [dispatch, introNo]);

    if (certification.length !== 0 && mode === 'CREATE') {
        setMode('READ');
    } else if (
        Array.isArray(certification) &&
        certification.length === 0 &&
        mode === 'READ'
    ) {
        setMode('CREATE');
    }

    let content = null;
    if (mode === 'CREATE') {
        content = (
            <IntroBox>
                <CardHeader>자격증</CardHeader>
                <Input
                    onCreate={(box) => {
                        dispatch(
                            createCertification({
                                introNo: introNo,
                                certificationDate: box.certificationDate,
                                certificationDetail: box.certificationDetail,
                                certificationIssuer: box.certificationIssuer,
                                certificationId: box.certificationId,
                                certificationName: box.certificationName,
                            })
                        );
                        setMode('READ');
                    }}
                ></Input>
            </IntroBox>
        );
    } else if (mode === 'READ') {
        console.log({ certification });
        content = (
            <IntroBox>
                <CardHeader>자격증</CardHeader>

                <Input
                    onCreate={(box) => {
                        dispatch(
                            createCertification({
                                introNo: introNo,
                                certificationDate: box.certificationDate,
                                certificationDetail: box.certificationDetail,
                                certificationIssuer: box.certificationIssuer,
                                certificationId: box.certificationId,
                                certificationName: box.certificationName,
                            })
                        );
                        setMode('READ');
                    }}
                ></Input>
                <Read certification={certification}></Read>
            </IntroBox>
        );
    }

    return content;
}
export default View;
