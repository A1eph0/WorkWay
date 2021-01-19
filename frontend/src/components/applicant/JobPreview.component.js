export default function JobPreview ({jobs}){
  
  return (
    <div className="job-list">
      {jobs.map(job => (
        <div className="job-preview" key={job.id} >
          <h2 href="">{ job.title }</h2>
          <p>Type : { job.type } </p>
          <p>Salary : { job.pay } </p>
          <p>Company: { job.recruiter }</p>
          <p> Duration: {job.duration} </p>
        </div>
      ))}
    </div>
  );
}
