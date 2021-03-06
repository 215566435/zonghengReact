import React from 'react'
import { SegmentedControl, WingBlank, WhiteSpace } from 'antd-mobile'
import { TrainerCard } from './trainer-card'
import DateTab from '../../component/date-tab'
import './index.scss'
import { ZONGHENG_THEME_COLOR, YELLOW, STYLE_COLOR, setTicket } from '../../utils'
import { connect } from 'react-redux'
import { CourseCard } from './course-card'

class Index extends React.Component {
  onChange = e => {
    this.props.dispatch({
      type: 'courseTypeChange',
      payload: e.nativeEvent.selectedSegmentIndex
    })
  }
  componentWillMount() {
    const ticket =
      process.env.NODE_ENV === 'production'
        ? this.props.match.params.id
        : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImYzMjk1YWUyMTEyMmUyYmRiYjlhZTAwZWM1NDRiNWQyNWY1ZDM3YzQiLCJpYXQiOjE1MjQ0NDc3MDIsImV4cCI6MTUyNDYyMDUwMn0._AEpuZUQ9vJsy9w8maN0HIT9nx1f6oggPxxplc1SjW8'
    localStorage.setItem('jwt_token', ticket)
  }

  componentDidMount() {
    this.props.dispatch({ type: 'fetchCourse' })
  }

  onDateChange = index => {
    // this.props.dispatch({ type: 'fetchCourse', payload: index })
    this.props.dispatch({ type: 'dateChange', payload: index })
  }

  render() {
    const course = () => {
      return this.props.courseType === 0 ? (
        <div>
          {this.props.trainer.map(trainer => (
            <TrainerCard
              key={trainer.id}
              id={trainer.id}
              name={trainer.trainer}
              bref={trainer.bref}
              tainerAvatar={trainer.avatarUrl}
            />
          ))}
        </div>
      ) : (
        <div>{this.props.course.map((course, index) => <CourseCard key={course.id} {...course} />)}</div>
      )
    }

    return (
      <div style={{ backgroundColor: '#595959' }}>
        <WingBlank size="lg">
          <WhiteSpace />
          <SegmentedControl
            values={['私教', '团课']}
            onChange={this.onChange}
            selectedIndex={this.props.courseType}
            tintColor={STYLE_COLOR}
            className="zongheng-segment"
          />
          <WhiteSpace />
        </WingBlank>
        <DateTab onChange={this.onDateChange}>
          {() => {
            return course()
          }}
        </DateTab>
      </div>
    )
  }
}

const mapState = state => {
  return { ...state.course }
}

export default connect(mapState)(Index)
