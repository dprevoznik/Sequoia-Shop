import React from "react";
import moment from "moment";
import axios from "axios";

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      markedHelpful: false,
      numHelpful: 0,
      reported: false,
      verified: false
    };
    this.toggleExpandBound = this.toggleExpand.bind(this);
    this.handleHelpfulBound = this.handleHelpful.bind(this);
    this.handleReportBound = this.handleReport.bind(this);
  }

  componentDidMount() {

    // *******************************************************
    // ************TODO: logic to check for verified user*****
    // *******************************************************

    let storage = window.localStorage;

    let helpful = JSON.parse(storage.getItem("helpful"));
    if (helpful) {
      if (helpful.indexOf(this.props.review.review_id) >= 0) {
        this.setState({
          markedHelpful: true
        });
      }
    }
    // shouldn't be possible that it's reported, but accounting for changes in API
    let reported = JSON.parse(storage.getItem("reported"));
    if (reported) {
      if (reported.indexOf(this.props.review.review_id) >= 0) {
        this.setState({
          reported: true
        });
      }
    }

    this.setState({
      numHelpful: this.props.review.helpfulness
    });
  }

  toggleExpand() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  handleHelpful() {
    let arr = JSON.parse(window.localStorage.getItem("helpful"));
    if (!arr || arr.indexOf(this.props.review.review_id) === -1) {
      if (!arr) {
        arr = [this.props.review.review_id];
      } else if (arr.indexOf(this.props.review.review_id) === -1) {
        arr.push(this.props.review.review_id);
      }
      window.localStorage.setItem("helpful", JSON.stringify(arr));
      this.setState({
        markedHelpful: true,
        numHelpful: this.state.numHelpful + 1
      });
      axios.put(`http://3.134.102.30/reviews/helpful/${this.props.review.review_id}`)
        .catch((err) => {
          console.log("Error marking helpful:", err);
        });
    }
  }

  handleReport() {
    let arr = JSON.parse(window.localStorage.getItem("reported"));
    if (arr) {
      arr.push(this.props.review.review_id);
    } else {
      arr = [this.props.review.review_id];
    }
    window.localStorage.setItem("reported", JSON.stringify(arr));
    this.setState({
      reported: true
    });
    axios.put(`http://3.134.102.30/reviews/report/${this.props.review.review_id}`)
      .catch((err) => {
        console.log("Error reporting review:", err);
      });
  }

  render() {
    let { review } = this.props;
    return (
      <div className="tile is-child box">
        <div>{review.rating}-star rating goes here</div>
        {this.state.verified
          ? <div className="has-text-right is-size-7">{review.reviewer_name}, {moment(review.date).format("MMMM DD, YYYY")}
            <br />&#10004; Verified user</div>
          : <div className="has-text-right is-size-7">{review.reviewer_name}, {moment(review.date).format("MMMM DD, YYYY")}</div>}
        <div className="subtitle">{review.summary}</div>
        {this.state.expanded || review.body.length <= 250
          ? <div>{review.body}</div>
          : <div>{review.body.slice(0, 250)}...</div>}
        {review.body.length > 250 && !this.state.expanded
          ? <div className="is-size-7" onClick={this.toggleExpandBound}>Show more</div>
          : null}
        {this.state.expanded
          ? <div className="is-size-7" onClick={this.toggleExpandBound}>Show less</div>
          : null}
        {review.recommend
          ? <div>&#10004; I recommend this product</div>
          : null}
        {review.response !== undefined && review.response !== null
          ? <div><strong>Seller response:</strong><br />{review.response}</div>
          : null}
        <div className="is-size-7">
          Helpful? <span className="actionable" onClick={this.handleHelpfulBound}>Yes({this.state.numHelpful})</span> | {this.state.reported 
            ? <span>Reported</span>
            : <span className="actionable" onClick={this.handleReportBound}>Report</span>}
        </div>
      </div>
    );
  }

}

export default ReviewTile;