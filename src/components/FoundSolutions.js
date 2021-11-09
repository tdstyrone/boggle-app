function FoundSolutions({ words, headerText}) {
  return (
    <div className="Found-solutions-list">
      {words.length > 0 &&
        <h5>{headerText}: {words.length}</h5>
      }
      <ol>
        {words.map((solution) => {return <li key={solution}>{solution}</li>})}
      </ol>
    </div>
  );
}

export default FoundSolutions;
