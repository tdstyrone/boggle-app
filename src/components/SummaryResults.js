function SummaryResults({ words, totalTime}) {
    return (
      <div className="Summary">
        <h3>SUMMARY</h3>

        <div>
          <ul key="12">Total Words Found: {words.length} {words.length === 1 ? 'word' : 'words'}</ul>
          {words.map((solution) => {return <li key={solution}>{solution}</li>})}
        </div>

        <div>
          <ul key="15">Total Time: {totalTime} secs</ul>
        </div> 
      </div>
    );
  }
  
  export default SummaryResults;
  