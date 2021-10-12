import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Swal from 'sweetalert2';
import DateTimePicker from 'react-datetime-picker';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { 
  eventClearActiveEvent, 
  eventStartNew, 
  eventStartUpdate, 
} from '../../actions/events';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#root');
}
const now = moment().minutes(0).seconds(0).add(1, 'hours');
const cloneEnd = now.clone().add(1, 'hour');
const initEvent = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: cloneEnd.toDate()
}

export const CalendarModal = () => {
  const dispatch = useDispatch();
  const {
    ui: { modalOpen },
    calendar: { activeEvent },
  } = useSelector(state => state);

  const [titleValid, setTitleValid] = useState(true)
  const [formValues, setFormValues] = useState(initEvent);

  const { title, notes, start, end } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initEvent);
    }
  }, [activeEvent])

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventClearActiveEvent());
    setFormValues(initEvent);
  }

  const handleStartDateChange = (e) => {
    setFormValues({
      ...formValues,
      start: e
    })
  }

  const handleEndDateChange = (e) => {
    setFormValues({
      ...formValues,
      end: e
    })
  }

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire({
        title: 'Error',
        text: 'End date should be grater',
        icon: 'error'
      });
    }

    if (title.trim().length < 2) {
      setTitleValid(false)
    }

    if (!!activeEvent) {
      dispatch(eventStartUpdate(formValues));
    } else {
      dispatch(eventStartNew(formValues));
    }

    setTitleValid(true);
    closeModal();
  }

  return (
    <Modal
      isOpen={modalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1> {(activeEvent) ? 'Editar Evento' : 'Nuevo Evento'} </h1>
      <hr />
      <form className="container" onSubmit={handleSubmitForm}>

        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={start}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            value={end}
            minDate={start}
            className="form-control"
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleValid && 'is-invalid'}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>

      </form>
    </Modal>
  )
}
