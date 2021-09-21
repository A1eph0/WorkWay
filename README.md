# Welcome to WorkWay Portal

WorkWay is a fully functional Job Portal built using MERN-Stack (`Mongoose`, `Express API`, `React` and `NodeJS`). It also uses `Axios`, `becryptjs`, `JWT` etc, along with a self-implemented middleware.

# Salient Features:

## Secure
  * Allows for two types of Users (Applicants and Recruiters) with dedicated usecases.
  * Highly secure with industry-standard password hashing and authentication protocols :
      1) Password hashing using `bcryptjs`.
      2) Token based authentication middleware, powered by `JWT` (JSON Web Token).
      3) Redirection on attempt to access unauthorised pages. 

## Sorting and Searching
  * Sorting based on multiple parameters, both in ascending and descending, implemented over relevant fields.
  * Filter based on multiple paramenters taken into consideration simultaneosly.
  * Fuzzy search implemented using `FuseJS`.

## Jobs posting
  * The recruiter can post jobs on the site, which can be view and applied to by interested candidates.
  * Deadline for application of each job is set by the recruiter, after which it is no longer visible on search. However, candidates who had applied for the job and have not been rejected can still view in these jobs
  * Number of posts available and total number of candidates who's application are being accepted can be set by the rectruiter.

## Rating system
  * Rating system for employees to rate their employer and the recruiters to to rate their recruitees.



* Automated confirmation sent via mail to applicant on being selected by the Recruiter
      1) Implemented using `nodemailer`
      2) Mailing message is custom for each use case, complete with relevant details including:
          * Applicant name 
          * Title of Job that the applicant has been recruited into
          * Name of the Company (recruiter).
   
      
  
