# Welcome to WorkWay Portal

# About
WorkWay is a fully functional Job Portal built using MERN-Stack (`Mongoose`, `Express API`, `React` and `NodeJS`). It also uses `Axios`, `becryptjs`, `JWT` etc, along with a self-implemented middleware.

For instructions running the portal, click [here](#Running-the-Portal).

# Table of Contents
- [About](#About)
- [Salient Features](#Salient-Features)
  - [Secure](##Secure)
  - []
- [Running the Portal](#Running-the-Portal)

# Salient Features
The list of features offered by this Job Portal include, but are not exclusive to the following:

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
  * Deadline for application of each job is set by the recruiter, after which it is no longer visible on search.
  * Jobs which have already recieved the maximum possible number of applications set by the recruiter can still be viewed by the applicants, although no applications will be accepted.

## Dashboard
  * The applicants can use the Dashboard to see all the jobs they have applied to as well as see their application status for the same.
  * The recruiters can use the Dashboard to see all the jobs posted by the company.
  * The Dashboard can be used to edit jobs, shortlist, accept or reject candidate etc.

## Jobs posting
  * The recruiter can post jobs on the site, which can be view and applied to by interested candidates.
  * Deadline for application of each job is set by the recruiter, after which it is no longer visible on search. However, candidates who had applied for the job and have not been rejected can still view in these jobs in their dashboard.
  * Number of posts available and total number of candidates who's application are being accepted can be set by the rectruiter.
  * Jobs which have already recieved the maximum possible number of applications set by the recruiter can still be viewed by the applicants, although no applications will be accepted. 

## Rating system
  * Rating system for employees to rate their employer and the recruiters to to rate their recruitees.
  * The rating system will be visible throughout the site to potential recruiters/applicants.

## Edit profile
  * All users can edit various aspects of their profile.
  * Recruiters can edit their company name or contact information, while for applicants this includes skills, education, contact information etc. also.

## Automated confirmation mails
* Automated confirmation sent via mail to applicant on being selected by the Recruiter
      1) Implemented using `nodemailer`
      2) Mailing message is custom for each use case, complete with relevant details including:
          * Applicant name 
          * Title of Job that the applicant has been recruited into
          * Name of the Company (recruiter).

# Running the Portal
To run the portal, first clone the repository. Then within the parent directory, run the following commands in order:
```
$ npm install
$ cd frontend && npm start
```

   
      
  
