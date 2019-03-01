package com.relwiwa.web.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

public class StudentDbUtil {

	private DataSource dataSource;
	
	public StudentDbUtil(DataSource theDataSource) {
		// data source is db connection pool
		dataSource = theDataSource;
	}

	public List<Student> getStudents() throws Exception {
		List<Student> students = new ArrayList<>();
		
		Connection myConn = null;
		Statement myStmt = null;
		ResultSet myRs = null;
		
		try {
			myConn = dataSource.getConnection();
			
			String sql = "select * from student order by last_name";
			myStmt = myConn.createStatement();
			myRs = myStmt.executeQuery(sql);
			
			while (myRs.next()) {
				int id = myRs.getInt("id");
				String firstName = myRs.getString("first_name");
				String lastName = myRs.getString("last_name");
				String email = myRs.getString("email");
				
				Student tempStudent = new Student(id, firstName, lastName, email);

				students.add(tempStudent);
			}
			
			return students;
		}
		finally {
			// close JDBC objects
			close(myConn, myStmt, myRs);
		}
	}
	
	public void addStudent(Student theStudent) throws SQLException {
		Connection myConn = null;
		PreparedStatement myStmt = null;
		
		try {
			// get db connection
			myConn = dataSource.getConnection();

			// create sql for insert
			String sql = "insert into student "
						+ "(first_name, last_name, email) "
						+ "values (?, ?, ?)";
			
			myStmt = myConn.prepareStatement(sql);
			
			// set the param values for the student
			myStmt.setString(1,  theStudent.getFirstName());
			myStmt.setString(2,  theStudent.getLastName());
			myStmt.setString(3,  theStudent.getEmail());

			// execute sql insert
			myStmt.execute();
		}
		
		finally {
			// clean up jdbc objects
			close(myConn, myStmt, null);
		}
	}
	
	private void close(Connection myConn, Statement myStmt, ResultSet myRs) {
		try {
			if (myRs != null) {
				myRs.close();
			}
			
			if (myStmt != null) {
				myStmt.close();
			}
			
			if (myConn != null) {
				// connection goes back to connection pool
				myConn.close();
			}
		}
		catch (Exception exc){
			exc.printStackTrace();
		}		
	}
}
