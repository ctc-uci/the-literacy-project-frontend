import React from 'react';
import AssessmentRow from './AssessmentRow';
import './AssessmentScoreCard.css';
import TextArea from 'react-expanding-textarea';

function AssessmentScoreCard() {
  return (
    <div class="div">
      <table>
        <tr>
          <th>#</th>
          <th>Game Name</th>
          <th>Phonic Skills</th>
          <th>Passing Score</th>
          <th>Player Score</th>
        </tr>
        <AssessmentRow
          testNumber={1}
          gameName="Alphabet Warm-Up Letters"
          skillTest="m, p, t, e, k, c, D, b, i, L, u, w, a, S, z"
          passingScore="13/15"
          numQuestions={15}
        />
        <AssessmentRow
          testNumber={2}
          gameName="Alphabet Warm-Up Sounds"
          skillTest="/m/, /d/, /p/, /f/, /w/, /l/, /h/"
          passingScore="6/7"
          numQuestions={7}
        />
        <AssessmentRow
          testNumber={3}
          gameName="Short Vowel Kick"
          skillTest="pat, hit, bet, hut, hop, nak, rit, lep, tum, rof"
          passingScore="8/10"
          numQuestions={10}
        />
        <AssessmentRow
          testNumber={4}
          gameName="Slight Word Drop Kick"
          skillTest="is, of, two, are, the, you, does, give, said, some, want, were, their, where, would"
          passingScore="10/15"
          numQuestions={15}
        />
        <AssessmentRow
          testNumber={5}
          gameName="Consonant Digraph Corner Kick"
          skillTest="shoe, church, photo, song, what"
          passingScore="5/5"
          numQuestions={5}
        />
        <AssessmentRow
          testNumber={6}
          gameName="Long & Short Vowel Pass"
          skillTest="no assessment"
          passingScore="n/a"
          numQuestions={0}
        />
        <AssessmentRow
          testNumber={7}
          gameName="Consonant Blend Bicycle Kick"
          skillTest="flag, skip, truck, snap, glad, spin, club"
          passingScore="5/7"
          numQuestions={7}
        />
        <AssessmentRow
          testNumber={8}
          gameName="Consonant Blend & Digraph Dribble"
          skillTest="no assessment"
          passingScore="n/a"
          numQuestions={0}
        />
        <AssessmentRow
          testNumber={9}
          gameName="Long Vowel Throw In"
          skillTest="street, pain, beat, foe, clay, boat"
          passingScore="4/6"
          numQuestions={6}
        />
        <AssessmentRow
          testNumber={10}
          gameName='"C" and "G" Slide Tackle'
          skillTest="city, cat, go, gem, cep, cote, gak, gip"
          passingScore="4/8"
          numQuestions={8}
        />
        <AssessmentRow
          testNumber={11}
          gameName="Affix Header"
          skillTest="slipped, mailed, wanted, thinking, coats, slows"
          passingScore="4/6"
          numQuestions={6}
        />
        <AssessmentRow
          testNumber={12}
          gameName="Diphthong Diving Save"
          skillTest="cloud, plow, soil, grew, blue, haul, paw, look, cook"
          passingScore="5/9"
          numQuestions={9}
        />
        <AssessmentRow
          testNumber={13}
          gameName="R-controlled Penalty Kick"
          skillTest="cork, fir, car, term, fur"
          passingScore="4/5"
          numQuestions={5}
        />
      </table>
      <TextArea placeholder="Notes" className="notes" rows="3" />
    </div>
  );
}

// Ideas for table layout:
// Have given information stored in an array of objects like [{testNumber: 1, gameName: "Alphabet", skillTest = "m,n,o,p", passingScore = "13/15"}, {...}, ...]
// And then to create the whole table just use the .map function or some other function to create each assessment row.

export default AssessmentScoreCard;
