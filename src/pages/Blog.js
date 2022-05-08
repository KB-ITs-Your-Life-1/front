import React, { useState, useEffect } from 'react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Dropdown, Input, Page, setOptions } from '@mobiscroll/react';
import { Link as RouterLink } from 'react-router-dom';
import { DateRangePicker, DateRange } from 'react-date-range';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays } from "date-fns"
// materialimport { DateRangePicker } from 'rsuite';
import { Grid, Container, Stack, Typography, Button } from '@mui/material';
// components
// import Page from '../components/Page';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { ColorPicker, createColor } from 'material-ui-color';
import Iconify from '../components/Iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';
// MediService
import MediService from '../service/MedicineService';
// ----------------------------------------------------------------------

setOptions({
  theme: 'ios',
  themeVariant: 'light'
});

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
];

export default function Blog() {

  // ------<약 정보 가져오기> 랜더링 될 때 한 번만 실행--------
  const [medicines, setMedicines] = useState([]);
  useEffect(() => {
    MediService.getAllMedicineInfo().then((res) => {
      setMedicines(res.data);
    })  
  },[]);
  
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);

  // ColorPicker
  const [color, setColor] = useState(createColor("#000"));
  const handleColorChange = (value) => {
    console.log("onChange=", value);
    setColor(value);
  };
  
  return (
    <Page>
      <div className="mbsc-grid mbsc-grid-fixed">
        <div className="mbsc-form-group">
          <div className="mbsc-row mbsc-justify-content-center">
            <div className="mbsc-col-md-10 mbsc-col-xl-8 mbsc-form-grid">
              <div className="mbsc-form-group-title">약 정보 입력</div>
              
              <div className="mbsc-row">
                <div className="mbsc-col-md-6 mbsc-col-12">
                  <Input type="text" label="약 이름" placeholder="약 이름" inputStyle="box" labelStyle="floating" />
                  <Input type="text" label="약 이름" placeholder="약 이름" inputStyle="box" labelStyle="floating" />
                  <Input type="text" label="약 이름" placeholder="약 이름" inputStyle="box" labelStyle="floating" />
                  <Autocomplete
                    id="highlights-demo"
                    options={medicines}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField {...params} label="약 이름" margin="normal"  variant="filled" color="secondary"/>
                    )}
                    renderOption={(props, option, { inputValue }) => {
                      const matches = match(option.name, inputValue);
                      const parts = parse(option.name, matches);

                      return (
                        <li {...props}>
                          <div>
                            {parts.map((part, index) => (
                              <span
                                key={index}
                                style={{
                                  fontWeight: part.highlight ? 700 : 400,
                                }}
                              >
                                {part.text}
                              </span>
                            ))}
                          </div>
                        </li>
                      );
                    }}
                  />
                
                </div>
                
                <div className="mbsc-col-md-6 mbsc-col-12">
                <div className="mbsc-form-group-title">날짜 입력</div>
                  <DateRange
                    // editableDateInputs={true}
                    onChange={item => setState([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                  />
                  <ColorPicker value={color} onChange={handleColorChange} />
                  <p>
                  <Button variant="contained">저장하기</Button>
                </p>
                </div >
              </div>

            </div>
          </div>
          
        </div>
        
      </div>
      
    </Page>
  );
}
