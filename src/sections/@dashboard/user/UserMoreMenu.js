import { useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import CalendarService from '../../../service/CalendarService'
import MemberService from '../../../service/MemberService'

// ----------------------------------------------------------------------

export default function UserMoreMenu(props) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // 부작용 삭제하기
  const onClickRemove = (event , title, start) => {
    setIsOpen(false);
    // 부작용 delete CalendarService 호출
    CalendarService.deleteTaking(MemberService.getCurrentUser().id, title, start);
    navigate(0);
  };

  // 부작용 수정하기
  const onClickEdit = (event , title, start, sideEffectName) => {
    setIsOpen(false);
    // 부작용 update CalendarService 호출
    CalendarService.updateTaking(MemberService.getCurrentUser().id, title, start, sideEffectName);
  };
  
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }} onClick ={(event ) => {onClickRemove(event, props.title, props.start) }}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24}/>
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }} onClick ={(event ) => {onClickEdit(event, props.title, props.start, props.sideEffectName) }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24}/>
          </ListItemIcon>
          <ListItemText primary="Save" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
