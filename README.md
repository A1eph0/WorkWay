# Welcome to WorkWay Portal

WorkWay is a fully functional Job Portal built using MERN-Stack.

## Salient Features:
  * Allows for two types of Users (Applicants and Recruiters) with dedicated usecases.
  * Highly secure with industry-standard password hashing and authentication protocols :
      1) Password hashing using `bcryptjs`
      2) Token based authentication middleware, powered by `JWT` (JSON Web Token)
      3) Redirection on attempt to access unauthorised pages 
  * Sorting based on multiple parameters, both in ascending and descending, implemented over relevant fields
  * Filter based on multiple paramenters taken into consideration simultaneosly
  * Fuzzy search implemented using `FuseJS`
  * Automated confirmation sent via mail to applicant on being selected by the Recruiter
      1) Implemented using `nodemailer`
      2) Mailing message is custom for each use case, complete with relevant details including:
          * Applicant name 
          * Title of Job that the applicant has been recruited into
          * Name of the Company (recruiter).
   
      
  
