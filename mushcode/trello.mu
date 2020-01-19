#header_author Lemuel Canady, Jr
#header_License MIT

/*
=============================================================================
=== Trello Job Commands: Setup ==============================================

  This is the mushcode portion of the Rhost to Trello Job system

=============================================================================
*/

// Search to see if the object is previously defined.
@wait 0=&js me=search(eval=match(name(##),Job System <JS>))

// If the object doesn't already exist, create it.
if not(v(js)) = {
    @create Job System <JS>
    @set JS = inherit no_modify indestructable 
    @tag/add js=[lastcreate(me,t)]
  }  

/*
-----------------------------------------------------------------------------
--- Command: job ------------------------------------------------------------

  SYNTAX:
    jobs
    job/add <job #>/
    job/new <bucket>/<title>[/<dbref>] = <body>
    job/comment <job #>=<comment>

  Add a new job to the external trello board. 

  Registers
  -----------
  %0 - bucket
  %1 - lhs
  %2 - rhs
-----------------------------------------------------------------------------
*/

&cmd.job tag(js) = $[@+]?job[s]?(?:/(\w+)\s(.*)?\s?=\s?(.*)):
  
  // Call execscript to process the request
  @pemit %#= [execsript(
    jobs/jobs.js,
    %#,
    [name(%#)],
    [lflags(%#)],
    [ltoggles(%#)],
    %0, 
    %1, 
    %2
  )];




